import { EntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class BaseEntitySetQueryMikroOrmFixtures {
  public static get any(): EntityData<BaseEntityMikroOrm> {
    const baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm> = {};

    return baseEntitySetQueryMikroOrm;
  }
}
