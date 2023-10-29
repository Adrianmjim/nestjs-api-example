import { InsertOneCatHttpV1 } from '../../../infrastructure/http/model/InsertOneCatHttpV1';
import { CatFixtures } from '../../domain/model/CatFixtures';

export class InsertOneCatHttpV1Fixtures {
  public static get any(): InsertOneCatHttpV1 {
    const insertOneCatHttpV1: InsertOneCatHttpV1 = new InsertOneCatHttpV1();

    insertOneCatHttpV1.bornDate = CatFixtures.any.bornDate;
    insertOneCatHttpV1.color = CatFixtures.any.color;
    insertOneCatHttpV1.name = CatFixtures.any.name;

    return insertOneCatHttpV1;
  }
}
