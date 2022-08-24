import { RequiredEntityData } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmFixtures } from '../model/BaseEntityMikroOrmFixtures';

export class BaseEntityInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm> {
    const baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm> = {
      createdById: BaseEntityMikroOrmFixtures.any.createdById,
    };

    return baseEntityInsertOneQueryMikroOrm;
  }
}
