import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatMikroOrmFixtures {
  public static get any(): CatMikroOrm {
    const catMikroOrm: CatMikroOrm = new CatMikroOrm();

    catMikroOrm.bornDate = CatFixtures.any.bornDate;
    catMikroOrm.createdAt = CatFixtures.any.createdAt;
    catMikroOrm.color = CatFixtures.any.color;
    catMikroOrm.id = CatFixtures.any.id;
    catMikroOrm.name = CatFixtures.any.name;
    catMikroOrm.version = CatFixtures.any.version;

    return catMikroOrm;
  }
}
