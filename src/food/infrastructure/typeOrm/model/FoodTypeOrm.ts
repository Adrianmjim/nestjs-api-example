import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from '../../../domain/model/Food';

@Entity('Food')
export class FoodTypeOrm implements Food {
  @Column()
  amount!: number;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  prize!: number;
}
