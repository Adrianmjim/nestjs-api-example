import { ObjectQuery } from '@mikro-orm/core';
import { AnyEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class AnyEntityFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<AnyEntityMikroOrm> {
    const anyEntityFindQueryMikroOrm: ObjectQuery<AnyEntityMikroOrm> = {};

    return anyEntityFindQueryMikroOrm;
  }
}
