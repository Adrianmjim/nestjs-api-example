import { CatTypeOrm } from '../../../../integration/typeOrm/model/CatTypeOrm';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class CatTypeOrmFixtures {
  public static get any(): CatTypeOrm {
    const catTypeOrm: CatTypeOrm = new CatTypeOrm();

    catTypeOrm.age = CatFixtures.any.age;
    catTypeOrm.breed = CatFixtures.any.breed;
    catTypeOrm.id = CatFixtures.any.id;
    catTypeOrm.name = CatFixtures.any.name;

    return catTypeOrm;
  }
}
