import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entiities/coffeee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entiities/flavor.entity.ts';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entites/event.entity';
import { ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
  ) {
    console.log(coffeesConfiguration);
  }
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
      // 顺序排序
      order: {
        id: 'ASC',
      },
    });
  }
  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((item) => this.preloadFlavorsByName(item)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }
  async update(id: string, updateCoffeeDto?: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((item) => this.preloadFlavorsByName(item)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }
  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
  private async preloadFlavorsByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction(); //这是一个事务 通过这个事务来保证数据的一致性

    try {
      coffee.recommendations++;

      const recomendedEvent = new Event();
      recomendedEvent.name = 'recommended_coffee';
      recomendedEvent.type = 'coffee';
      recomendedEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recomendedEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
