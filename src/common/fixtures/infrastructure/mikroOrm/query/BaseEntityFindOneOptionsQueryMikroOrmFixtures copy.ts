import { FindOneOptions } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityFindOneOptionsQueryMikroOrmFixtures {
  public static get any(): FindOneOptions<BaseEntityMikroOrm> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOneOptionsQueryMikroOrm;
  }
}
