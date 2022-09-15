import { FoodFindQuery } from './FoodFindQuery';

export class FoodFindOneQuery extends FoodFindQuery {
  public constructor(ids: string[] | undefined) {
    super(ids);
  }
}
