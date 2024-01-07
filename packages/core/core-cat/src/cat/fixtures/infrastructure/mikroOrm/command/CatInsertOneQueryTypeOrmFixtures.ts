import { RequiredEntityData } from '@mikro-orm/core';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<CatMikroOrm> {
    const catInsertOneQueryMikroOrm: RequiredEntityData<CatMikroOrm> = {
      bornDate: CatFixtures.any.bornDate,
      color: CatFixtures.any.color,
      name: CatFixtures.any.name,
    };

    return catInsertOneQueryMikroOrm;
  }
}
