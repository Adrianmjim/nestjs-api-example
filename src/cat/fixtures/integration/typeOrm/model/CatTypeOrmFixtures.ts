import { FoodTypeOrm } from '../../../../../food/integration/typeOrm/model/FoodTypeOrm';
import { UserTypeOrm } from '../../../../../user/integration/typeOrm/model/UserTypeOrm';
import { CatTypeOrm } from '../../../../integration/typeOrm/model/CatTypeOrm';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class CatTypeOrmFixtures {
  public static get any(): CatTypeOrm {
    const catTypeOrm: CatTypeOrm = new CatTypeOrm();

    catTypeOrm.age = CatFixtures.any.age;
    catTypeOrm.breed = CatFixtures.any.breed;
    catTypeOrm.id = CatFixtures.any.id;
    catTypeOrm.name = CatFixtures.any.name;
    catTypeOrm.favouriteFood = { id: CatFixtures.any.favouriteFoodId } as FoodTypeOrm;
    catTypeOrm.owner = { id: CatFixtures.any.ownerId } as UserTypeOrm;

    return catTypeOrm;
  }
}
