import { Entity, Property } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';

@Entity({ tableName: 'Food' })
export class UserMikroOrm extends BaseEntityMikroOrm {
  @Property({ name: 'amount', type: 'int' })
  age!: number;

  @Property({ length: 64, name: 'email', type: 'varchar' })
  email!: string;

  @Property({ length: 64, name: 'name', type: 'varchar' })
  name!: string;

  @Property({ length: 64, name: 'name', type: 'varchar' })
  surname!: string;
}
