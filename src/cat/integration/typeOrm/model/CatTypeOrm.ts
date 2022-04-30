import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
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
}
