import { FindOptions } from '@mikro-orm/core';
import { AnyEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class AnyEntityFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<AnyEntityMikroOrm> {
    const anyEntityFindOptionsQueryMikroOrm: FindOptions<AnyEntityMikroOrm> = {};

    return anyEntityFindOptionsQueryMikroOrm;
  }

  public static get withLimitAndOffset(): FindOptions<AnyEntityMikroOrm> {
    const anyEntityFindOptionsQueryMikroOrm: FindOptions<AnyEntityMikroOrm> = {
      limit: 10,
      offset: 0,
    };

    return anyEntityFindOptionsQueryMikroOrm;
  }
}
