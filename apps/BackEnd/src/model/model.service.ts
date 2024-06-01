import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelConfig } from './entities/model-config.entity';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelConfig)
    private readonly configRepository: Repository<ModelConfig>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}
  create(createConfigDto: CreateConfigDto) {
    const config = this.configRepository.create(createConfigDto);
    return this.configRepository.save(config);
  }
  findAllModel() {
    return this.modelRepository.find();
  }
  findAll(paginationQuery: PaginationQueryDto) {
    if (!paginationQuery) return this.configRepository.find();
    const { limit, offset } = paginationQuery;
    return this.configRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const config = await this.configRepository.findOne({
      where: { config_id: +id },
    });
    if (!config) {
      throw new NotFoundException(`Config #${id} not found`);
    }
    return config;
  }
  async update(id: number, updateConfigDto: UpdateConfigDto) {
    const config = await this.configRepository.preload({
      config_id: +id,
      ...updateConfigDto,
    });
    if (!config) {
      throw new NotFoundException(`Config #${id} not found`);
    }
    return this.configRepository.save(config);
  }

  async remove(id: number) {
    const config = await this.findOne(id);
    return this.configRepository.remove(config);
  }
}
