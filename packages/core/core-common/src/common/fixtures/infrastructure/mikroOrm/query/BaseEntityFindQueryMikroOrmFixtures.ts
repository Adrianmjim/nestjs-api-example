import { ObjectQuery } from '@mikro-orm/core';
import { BaseEntityMikroOrmFixtures } from '@nestjs-api-example/core-entity-orm/fixture';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class BaseEntityFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {};

    return baseEntityFindQueryMikroOrm;
  }

  public static get withIds(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {
      id: { $in: [BaseEntityMikroOrmFixtures.any.id] },
    };

    return baseEntityFindQueryMikroOrm;
  }
}
