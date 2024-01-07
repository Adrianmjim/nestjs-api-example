import { FindOneOptions } from '@mikro-orm/core';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class CatFindOneOptionsQueryMikroOrmFixtures {
  public static get any(): FindOneOptions<CatMikroOrm> {
    const catFindOneOptionsQueryMikroOrm: FindOneOptions<CatMikroOrm> = {};

    return catFindOneOptionsQueryMikroOrm;
  }
}
