import { FindOptions } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<CatMikroOrm> {
    const catFindOptionsQueryMikroOrm: FindOptions<CatMikroOrm> = {};

    return catFindOptionsQueryMikroOrm;
  }
}
