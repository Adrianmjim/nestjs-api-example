import { Cat } from '../../../../domain/model/Cat';
import { InsertCatHttpV1 } from '../../../../integration/http/model/InsertCatHttpV1';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class InsertCatHttpV1Fixtures {
  public static get any(): InsertCatHttpV1 {
    const insertCatHttpV1: InsertCatHttpV1 = new InsertCatHttpV1();
    const catFixture: Cat = CatFixtures.any;

    insertCatHttpV1.age = catFixture.age;
    insertCatHttpV1.breed = catFixture.breed;
    insertCatHttpV1.name = catFixture.name;

    return insertCatHttpV1;
  }
}
