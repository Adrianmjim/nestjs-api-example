import { Entity, Property } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';

@Entity({ tableName: 'Food' })
export class FoodMikroOrm extends BaseEntityMikroOrm {
  @Property({ name: 'amount', type: 'int' })
  amount!: number;

  @Property({ length: 64, name: 'name', type: 'varchar' })
  name!: string;

  @Property({ name: 'prize', type: 'int' })
  prize!: number;
}
