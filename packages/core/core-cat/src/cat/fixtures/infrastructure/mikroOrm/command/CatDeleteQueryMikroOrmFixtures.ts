import { ObjectQuery } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatDeleteQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<CatMikroOrm> {
    const catDeleteQueryMikroOrm: ObjectQuery<CatMikroOrm> = {};

    return catDeleteQueryMikroOrm;
  }
}
