import { FindConditions } from 'typeorm';
import { CatTypeOrm } from '../../../integration/typeOrm/model/CatTypeOrm';
import { CatFixtures } from '../../domain/model/CatFixtures';

export class CatFindQueryTypeOrmFixtures {
  public static get withAge(): FindConditions<CatTypeOrm> {
    return {
      age: CatFixtures.any.age,
    };
  }

  public static get withBreed(): FindConditions<CatTypeOrm> {
    return {
      breed: CatFixtures.any.breed,
    };
  }

  public static get withId(): FindConditions<CatTypeOrm> {
    return {
      id: CatFixtures.any.id,
    };
  }

  public static get withName(): FindConditions<CatTypeOrm> {
    return {
      name: CatFixtures.any.name,
    };
  }
}
