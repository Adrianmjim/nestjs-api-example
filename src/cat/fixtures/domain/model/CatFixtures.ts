import { Cat } from '../../../domain/model/Cat';

export class CatFixtures {
  public static get any(): Cat {
    const cat: Cat = {
      ownerId: 'owner-id',
      age: 2,
      breed: 'cat-breed',
      id: '3',
      name: 'cat-name',
    };

    return cat;
  }
}
