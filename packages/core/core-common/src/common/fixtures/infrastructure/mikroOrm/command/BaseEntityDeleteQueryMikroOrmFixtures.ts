import { ObjectQuery } from '@mikro-orm/core';
import { BaseEntityMikroOrmFixtures } from '@nestjs-api-example/core-entity-orm/fixture';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

export class BaseEntityDeleteQueryMikroOrmFixtures {
  public static get withId(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {
      id: BaseEntityMikroOrmFixtures.any.id,
    };

    return baseEntityDeleteQueryMikroOrm;
  }
}
