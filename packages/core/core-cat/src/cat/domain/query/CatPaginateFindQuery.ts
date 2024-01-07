import { BaseEntityPaginateFindQuery } from '@nestjs-api-example/core-common/query';
import { PaginationOptions } from '@nestjs-api-example/core-entity/model';

import { CatFindQuery } from './CatFindQuery';

export class CatPaginateFindQuery implements BaseEntityPaginateFindQuery {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly paginationOptions: PaginationOptions,
  ) {}
}
