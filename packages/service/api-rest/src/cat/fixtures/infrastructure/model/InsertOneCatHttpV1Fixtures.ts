import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { InsertOneCatHttpV1 } from '../../../infrastructure/http/model/InsertOneCatHttpV1';

export class InsertOneCatHttpV1Fixtures {
  public static get any(): InsertOneCatHttpV1 {
    const insertOneCatHttpV1: InsertOneCatHttpV1 = new InsertOneCatHttpV1();

    insertOneCatHttpV1.bornDate = CatFixtures.any.bornDate;
    insertOneCatHttpV1.color = CatFixtures.any.color;
    insertOneCatHttpV1.name = CatFixtures.any.name;

    return insertOneCatHttpV1;
  }
}
