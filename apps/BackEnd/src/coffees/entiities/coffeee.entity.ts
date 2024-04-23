import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity.ts';
@Entity() //这样就指定数据库中的表名为coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column({ default: 0 })
  recommendations: number;
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, //['insert']
  })
  flavors: Flavor[];
}
