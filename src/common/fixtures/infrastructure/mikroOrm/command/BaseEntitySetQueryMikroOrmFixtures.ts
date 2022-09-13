import { EntityData } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmFixtures } from '../model/BaseEntityMikroOrmFixtures';

export class BaseEntitySetQueryMikroOrmFixtures {
  public static get any(): EntityData<BaseEntityMikroOrm> {
    const baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm> = {};

    if (BaseEntityMikroOrmFixtures.withUpdatedAtAndUpdatedBy.updatedById !== undefined) {
      baseEntitySetQueryMikroOrm.updatedById = BaseEntityMikroOrmFixtures.withUpdatedAtAndUpdatedBy.updatedById;
    }

    return baseEntitySetQueryMikroOrm;
  }
}
