import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../domain/model/User';

@Entity('User')
export class UserTypeOrm implements User {
  @Column()
  age!: number;

  @Column()
  email!: string;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;
}
