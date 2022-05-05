import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Food } from '../../../../food/domain/model/Food';
import { FoodTypeOrm } from '../../../../food/integration/typeOrm/model/FoodTypeOrm';
import { User } from '../../../../user/domain/model/User';
import { UserTypeOrm } from '../../../../user/integration/typeOrm/model/UserTypeOrm';
import { Purchase } from '../../../domain/model/Purchase';

@Entity('Purchase')
export class PurchaseTypeOrm implements Purchase {
  @Column()
  date!: Date;

  @ManyToOne(() => FoodTypeOrm)
  @JoinColumn()
  food!: Food;

  @RelationId((purchaseTypeOrm: PurchaseTypeOrm) => purchaseTypeOrm.food)
  foodId!: string;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  prize!: number;

  @ManyToOne(() => UserTypeOrm)
  @JoinColumn()
  user!: User;

  @RelationId((purchaseTypeOrm: PurchaseTypeOrm) => purchaseTypeOrm.user)
  userId!: string;
}
