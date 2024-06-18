// - 每个会话包含了多个消息，用于记录用户和模型之间的聊天内容。
// - 每条消息有唯一的消息ID、会话ID、用户ID、消息内容、发送时间、发送者类型和消息类型。
// - 用户与模型之间的聊天会话由会话模块管理。
// - 每个会话有唯一的会话ID、名称，以及与之相关的用户ID、创建时间和更新时间。

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Message } from './message.entity';
@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  create_time: string;

  @UpdateDateColumn()
  update_time: string;
  @OneToMany(() => Message, (message) => message.session, { cascade: true })
  @JoinTable()
  messages: Message[];

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinTable()
  user: User;
}
