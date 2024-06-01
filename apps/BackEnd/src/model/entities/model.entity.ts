import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ModelConfig } from './model-config.entity';
@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ModelConfig, (config) => config.model)
  @JoinTable()
  configs: ModelConfig[];
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
