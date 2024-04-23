import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffeee.entity';
@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
