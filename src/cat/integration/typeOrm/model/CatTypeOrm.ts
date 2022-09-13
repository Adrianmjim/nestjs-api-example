import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Food } from '../../../../food/domain/model/Food';
import { FoodTypeOrm } from '../../../../food/infrastructure/typeOrm/model/FoodTypeOrm';
import { User } from '../../../../user/domain/model/User';
import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';
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

  @ManyToOne(() => UserTypeOrm)
  @JoinColumn()
  owner!: User;

  @RelationId((catTypeOrm: CatTypeOrm) => catTypeOrm.owner)
  ownerId!: string;

  @ManyToOne(() => FoodTypeOrm)
  @JoinColumn()
  favouriteFood!: Food;

  @RelationId((catTypeOrm: CatTypeOrm) => catTypeOrm.favouriteFood)
  favouriteFoodId!: string;
}
