import { RequiredEntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class BaseEntityInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm> {
    const baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm> = {};

    return baseEntityInsertOneQueryMikroOrm;
  }
}
