import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityFixtures } from '../../../domain/model/BaseEntityFixtures';

export class BaseEntityMikroOrmFixtures {
  public static get any(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.any.createdAt;
    baseEntityMikroOrm.createdById = BaseEntityFixtures.any.createdById;
    baseEntityMikroOrm.id = BaseEntityFixtures.any.id;
    baseEntityMikroOrm.version = BaseEntityFixtures.any.version;

    return baseEntityMikroOrm;
  }

  public static get withUpdatedAtAndUpdatedBy(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.withUpdatedAtAndUpdatedById.createdAt;
    baseEntityMikroOrm.createdById = BaseEntityFixtures.withUpdatedAtAndUpdatedById.createdById;
    baseEntityMikroOrm.id = BaseEntityFixtures.withUpdatedAtAndUpdatedById.id;

    if (BaseEntityFixtures.withUpdatedAtAndUpdatedById.updatedAt !== undefined) {
      baseEntityMikroOrm.updatedAt = BaseEntityFixtures.withUpdatedAtAndUpdatedById.updatedAt;
    }

    baseEntityMikroOrm.updatedById = BaseEntityFixtures.withUpdatedAtAndUpdatedById.updatedById as string;
    baseEntityMikroOrm.version = BaseEntityFixtures.withUpdatedAtAndUpdatedById.version;

    return baseEntityMikroOrm;
  }
}
