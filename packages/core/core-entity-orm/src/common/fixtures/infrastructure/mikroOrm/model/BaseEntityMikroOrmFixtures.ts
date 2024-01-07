import { BaseEntityFixtures } from '@nestjs-api-example/core-entity/fixture';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityMikroOrmFixtures {
  public static get any(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.any.createdAt;
    baseEntityMikroOrm.id = BaseEntityFixtures.any.id;
    baseEntityMikroOrm.version = BaseEntityFixtures.any.version;

    return baseEntityMikroOrm;
  }

  public static get withUpdatedAt(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.withUpdatedAt.createdAt;
    baseEntityMikroOrm.id = BaseEntityFixtures.withUpdatedAt.id;

    if (BaseEntityFixtures.withUpdatedAt.updatedAt !== undefined) {
      baseEntityMikroOrm.updatedAt = BaseEntityFixtures.withUpdatedAt.updatedAt;
    }

    baseEntityMikroOrm.version = BaseEntityFixtures.withUpdatedAt.version;

    return baseEntityMikroOrm;
  }
}
