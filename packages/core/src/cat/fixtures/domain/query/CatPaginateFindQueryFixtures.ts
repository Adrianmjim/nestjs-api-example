import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatFindQueryFixtures } from './CatFindQueryFixtures';

export class CatPaginateFindQueryFixtures {
  public static get any(): CatPaginateFindQuery {
    const catPaginateFindQuery: CatPaginateFindQuery = new CatPaginateFindQuery(CatFindQueryFixtures.any, {
      limit: 10,
      page: 1,
    });

    return catPaginateFindQuery;
  }

  public static get withIds(): CatPaginateFindQuery {
    const catPaginateFindQuery: CatPaginateFindQuery = new CatPaginateFindQuery(CatFindQueryFixtures.withIds, {
      limit: 10,
      page: 1,
    });

    return catPaginateFindQuery;
  }
}
