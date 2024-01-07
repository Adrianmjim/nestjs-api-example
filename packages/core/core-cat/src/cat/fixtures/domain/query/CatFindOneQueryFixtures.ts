import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';

export class CatFindOneQueryFixtures {
  public static get any(): CatFindOneQuery {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({});

    return catFindOneQuery;
  }

  public static get withIds(): CatFindOneQuery {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({
      ids: [CatFixtures.any.id],
    });

    return catFindOneQuery;
  }
}
