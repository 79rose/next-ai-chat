import { UpdateSessionDto } from './dto/update-session.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/sessions.entity';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(userId: number) {
    const user = await this.loadUserById(userId);
    const session = this.sessionRepository.create({
      userId,
      user: user,
      title: '新的聊天',
    });
    return {
      data: await this.sessionRepository.save(session),
    };
  }
  async findAll(userId?: string) {
    if (!!userId) {
      return {
        data: {
          list: await this.sessionRepository.find({
            where: { userId: +userId },
            order: {
              update_time: 'ASC',
            },
          }),
        },
      };
    }
    return {
      data: {
        list: await this.sessionRepository.find(),
      },
    };
  }
  async findOne(id: string) {
    const session = await this.sessionRepository.find({
      where: {
        id: +id,
      },
    });
    return {
      data: {
        list: session,
      },
    };
  }
  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const oldSession = await this.sessionRepository.findOne({
      where: { id: +id },
    });
    if (!oldSession) {
      throw new NotFoundException(`Session #${id} not found`);
    }
    // 直接更新
    return {
      data: await this.sessionRepository.save({
        ...oldSession,
        ...updateSessionDto,
      }),
    };
  }
  async remove(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session #${id} not found`);
    }

    return {
      data: await this.sessionRepository.remove(session),
    };
  }
  // 加载user by id
  async loadUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
