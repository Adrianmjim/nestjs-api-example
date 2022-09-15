import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityFixtures } from '../../../domain/model/BaseEntityFixtures';

export class BaseEntityMikroOrmFixtures {
  public static get any(): BaseEntityMikroOrm {
    const baseEntityMikroOrm: BaseEntityMikroOrm = new BaseEntityMikroOrm();

    baseEntityMikroOrm.createdAt = BaseEntityFixtures.any.createdAt;
    baseEntityMikroOrm.id = BaseEntityFixtures.any.id;
    baseEntityMikroOrm.version = BaseEntityFixtures.any.version;

    return baseEntityMikroOrm;
  }
}
