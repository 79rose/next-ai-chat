import { ModelConfig } from 'src/model/entities/model-config.entity';
import { Model } from 'src/model/entities/model.entity';
import { Session } from 'src/message/entities/sessions.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  user_avatar: string;
  @Column()
  user_role: string;
  @CreateDateColumn()
  create_time: string;
  @UpdateDateColumn()
  update_time: string;
  // 与Model实体类的多对多关系
  @ManyToMany(() => Model, (model) => model.users)
  @JoinTable()
  models: Model[];
  // 用户与ModelConfig实体类的一对多关系
  @OneToMany(() => ModelConfig, (config) => config.user)
  @JoinTable()
  configs: ModelConfig[];

  @OneToMany(() => Session, (session) => session.user, { cascade: true })
  @JoinTable()
  sessions: Session[];
}
