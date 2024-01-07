import { ObjectQuery } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<CatMikroOrm> {
    const catFindQueryMikroOrm: ObjectQuery<CatMikroOrm> = {};

    return catFindQueryMikroOrm;
  }
}
