import { FindOptions } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityQueryOrderMapMikroOrmFixtures } from './BaseEntityQueryOrderMapMikroOrmFixtures';

export class BaseEntityFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<BaseEntityMikroOrm> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOptionsQueryMikroOrm;
  }
  public static get withLimitAndOffset(): FindOptions<BaseEntityMikroOrm> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = { limit: 10, offset: 0 };

    return baseEntityFindOptionsQueryMikroOrm;
  }

  public static get withOrderBy(): FindOptions<BaseEntityMikroOrm> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {
      orderBy: [BaseEntityQueryOrderMapMikroOrmFixtures.any],
    };

    return baseEntityFindOneOptionsQueryMikroOrm;
  }
}
