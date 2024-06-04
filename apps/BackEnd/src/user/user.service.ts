import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user_role = createUserDto?.user_role ?? 'user';
    const user = this.userRepository.create({ ...createUserDto, user_role });
    const data = this.userRepository.save(user);
    return { data };
  }

  findAll(paginationQuery: PaginationQueryDto) {
    if (!paginationQuery) return this.userRepository.find();
    const { limit, offset } = paginationQuery;
    const data = this.userRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
    return { data };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: +id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return { data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    // return this.userRepository.save(user);
    const data = this.userRepository.save(user);
    return { data };
  }

  async remove(id: number) {
    const { data: user } = await this.findOne(id);
    const data = this.userRepository.remove(user);
    return { data };
  }
}
