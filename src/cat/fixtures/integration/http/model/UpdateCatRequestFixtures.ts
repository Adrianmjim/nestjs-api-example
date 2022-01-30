import { UpdateCatRequest } from '../../../../integration/http/model/UpdateCatRequest';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class UpdateCatRequestFixtures {
  public static get any(): UpdateCatRequest {
    const updateCatRequest: UpdateCatRequest = new UpdateCatRequest();

    updateCatRequest.age = CatFixtures.any.age;
    updateCatRequest.breed = CatFixtures.any.breed;
    updateCatRequest.name = CatFixtures.any.name;

    return updateCatRequest;
  }

  public static get withName(): UpdateCatRequest {
    const updateCatRequest: UpdateCatRequest = new UpdateCatRequest();

    updateCatRequest.name = CatFixtures.any.name;

    return updateCatRequest;
  }
}
