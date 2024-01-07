import { RequiredEntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityInsertOneQueryMikroOrmFixtures } from './BaseEntityInsertOneQueryMikroOrmFixtures';

export class BaseEntityInsertQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [];

    return baseEntityInsertQueryMikroOrm;
  }

  public static get withBaseEntityInsertOneQueryMikroOrm(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [
      ...this.any,
      BaseEntityInsertOneQueryMikroOrmFixtures.any,
    ];

    return baseEntityInsertQueryMikroOrm;
  }
}
