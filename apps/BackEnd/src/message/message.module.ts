import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { chatController } from './message.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Session } from './entities/sessions.entity';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Message, Session, User])],
  controllers: [chatController],
  providers: [MessageService, SessionService],
  exports: [MessageService, SessionService],
})
export class MessageModule {}
