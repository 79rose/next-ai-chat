import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  create_time: string;
  @Column()
  update_time: string;
}
