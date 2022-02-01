import { UpdateCatHttpV1 } from '../../../../integration/http/model/UpdateCatHttpV1';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class UpdateCatHttpV1Fixtures {
  public static get any(): UpdateCatHttpV1 {
    const updateCatHttpV1: UpdateCatHttpV1 = new UpdateCatHttpV1();

    updateCatHttpV1.age = CatFixtures.any.age;
    updateCatHttpV1.breed = CatFixtures.any.breed;
    updateCatHttpV1.name = CatFixtures.any.name;

    return updateCatHttpV1;
  }

  public static get withName(): UpdateCatHttpV1 {
    const updateCatHttpV1: UpdateCatHttpV1 = new UpdateCatHttpV1();

    updateCatHttpV1.name = CatFixtures.any.name;

    return updateCatHttpV1;
  }
}
