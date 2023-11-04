import { FindOptions } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<BaseEntityMikroOrm> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOptionsQueryMikroOrm;
  }
  public static get withLimitAndOffset(): FindOptions<BaseEntityMikroOrm> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = { limit: 10, offset: 0 };

    return baseEntityFindOptionsQueryMikroOrm;
  }
}
