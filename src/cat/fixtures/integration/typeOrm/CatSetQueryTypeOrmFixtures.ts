import { DeepPartial } from 'typeorm';
import { CatTypeOrm } from '../../../integration/typeOrm/model/CatTypeOrm';
import { CatFixtures } from '../../domain/model/CatFixtures';

export class CatSetQueryTypeOrmFixtures {
  public static get withAge(): DeepPartial<CatTypeOrm> {
    return {
      age: CatFixtures.any.age,
    };
  }

  public static get withBreed(): DeepPartial<CatTypeOrm> {
    return {
      breed: CatFixtures.any.breed,
    };
  }

  public static get withName(): DeepPartial<CatTypeOrm> {
    return {
      name: CatFixtures.any.name,
    };
  }
}
