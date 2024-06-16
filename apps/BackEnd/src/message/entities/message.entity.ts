import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './sessions.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionId: number;

  @Column()
  content: string;

  @Column()
  senderType: string;

  @Column()
  messageType: string;

  @CreateDateColumn()
  create_time: string;

  @UpdateDateColumn()
  update_time: string;

  @ManyToOne(() => Session, (session) => session.messages)
  @JoinTable()
  session: Session;
}
