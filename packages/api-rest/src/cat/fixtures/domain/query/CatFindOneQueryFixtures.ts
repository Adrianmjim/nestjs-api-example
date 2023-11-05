import { CatFindOneQuery } from '@nestjs-api-example/core/queries';

import { CatFixtures } from '../model/CatFixtures';

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
