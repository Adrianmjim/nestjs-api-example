import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFixtures } from '../model/CatFixtures';

export class CatFindQueryFixtures {
  public static get any(): CatFindQuery {
    return new CatFindQuery(CatFixtures.any.age, undefined, undefined, undefined, undefined, undefined);
  }

  public static get withAge(): CatFindQuery {
    return new CatFindQuery(CatFixtures.any.age, undefined, undefined, undefined, undefined, undefined);
  }

  public static get withBreed(): CatFindQuery {
    return new CatFindQuery(undefined, CatFixtures.any.breed, undefined, undefined, undefined, undefined);
  }

  public static get withFavouriteFoodId(): CatFindQuery {
    return new CatFindQuery(undefined, undefined, CatFixtures.any.favouriteFoodId, undefined, undefined, undefined);
  }

  public static get withId(): CatFindQuery {
    return new CatFindQuery(undefined, undefined, undefined, CatFixtures.any.id, undefined, undefined);
  }

  public static get withName(): CatFindQuery {
    return new CatFindQuery(undefined, undefined, undefined, undefined, CatFixtures.any.name, undefined);
  }

  public static get withOwnerId(): CatFindQuery {
    return new CatFindQuery(undefined, undefined, undefined, undefined, undefined, CatFixtures.any.ownerId);
  }
}
