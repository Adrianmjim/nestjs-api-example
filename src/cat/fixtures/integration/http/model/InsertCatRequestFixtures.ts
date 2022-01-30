import { Cat } from '../../../../domain/model/Cat';
import { InsertCatRequest } from '../../../../integration/http/model/InsertCatRequest';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class InsertCatRequestFixtures {
  public static get any(): InsertCatRequest {
    const insertCatRequest: InsertCatRequest = new InsertCatRequest();
    const catFixture: Cat = CatFixtures.any;

    insertCatRequest.age = catFixture.age;
    insertCatRequest.breed = catFixture.breed;
    insertCatRequest.name = catFixture.name;

    return insertCatRequest;
  }
}
