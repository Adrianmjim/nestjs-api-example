import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export class FoodFindQuery implements BaseEntityFindQuery {
  public constructor(public readonly ids: string[] | undefined) {}
}
