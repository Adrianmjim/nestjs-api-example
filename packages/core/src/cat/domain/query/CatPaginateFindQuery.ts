import { PaginationOptions } from '../../../common/domain/model/PaginationOptions';
import { BaseEntityPaginateFindQuery } from '../../../common/domain/query/BaseEntityPaginateFindQuery';
import { CatFindQuery } from './CatFindQuery';

export class CatPaginateFindQuery implements BaseEntityPaginateFindQuery {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly paginationOptions: PaginationOptions,
  ) {}
}
