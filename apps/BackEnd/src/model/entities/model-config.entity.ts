import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Model } from './model.entity';
import { User } from 'src/user/entities/user.entity';
@Entity('model_config')
export class ModelConfig {
  @PrimaryGeneratedColumn()
  config_id: number;
  @Column()
  model_id: number;
  @Column()
  config_name: string;
  @Column()
  config_value: string;
  @Column()
  config_desc: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: string;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: string;
  @ManyToOne(() => Model, (model) => model.configs)
  @JoinTable()
  model: Model;
  // 与user的 多对一关系
  @ManyToOne(() => User, (user) => user.configs)
  @JoinTable()
  user: User;
}
