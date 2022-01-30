import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from '../../../domain/model/Cat';

@Entity('Cat')
export class CatTypeOrm implements Cat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column()
  breed!: string;
}
