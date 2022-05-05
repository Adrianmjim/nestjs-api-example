import { Cat } from '../../../domain/model/Cat';

export class CatFixtures {
  public static get any(): Cat {
    const cat: Cat = {
      age: 2,
      breed: 'cat-breed',
      favouriteFoodId: '4',
      id: 'id',
      name: 'cat-name',
      ownerId: '5',
    };

    return cat;
  }
}
