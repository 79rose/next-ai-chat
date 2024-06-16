import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/sessions.entity';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const Session = await this.loadSessionById(createMessageDto.sessionId);
    if (!createMessageDto.senderType) {
      createMessageDto.senderType = 'user';
    }
    if (!createMessageDto.messageType) {
      createMessageDto.messageType = 'text';
    }
    const message = this.messageRepository.create({
      ...createMessageDto,
      session: Session,
    });
    if (!Session.messages) {
      Session.messages = [message];
    } else Session.messages = [...Session.messages, message];
    await this.sessionRepository.save(Session);
    return {
      data: await this.messageRepository.save(message),
    };
  }

  async findAll(id: string) {
    return {
      data: {
        list: await this.messageRepository.find({ where: { sessionId: +id } }),
      },
    };
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    return {
      data: message,
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    const updatedMessage = await this.messageRepository.save({
      ...message,
      ...updateMessageDto,
    });
    return {
      data: updatedMessage,
    };
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    await this.messageRepository.remove(message);
    return {
      data: message,
    };
  }
  // 加载session by id
  async loadSessionById(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });
    if (!session) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
    return session;
  }
}
