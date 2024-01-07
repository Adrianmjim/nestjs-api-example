import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';
import { PaginateFindQueryHandler } from '@nestjs-api-example/core-common/query-handler';
import { Cat, Pagination } from '@nestjs-api-example/core-entity/model';

import { PaginateFindCatManager } from '../../domain/manager/PaginateFindCatManager';
import { CatPaginateFindQuery } from '../../domain/query/CatPaginateFindQuery';

@QueryHandler(CatPaginateFindQuery)
export class CatPaginateFindQueryHandler extends PaginateFindQueryHandler<CatPaginateFindQuery, Cat> {
  public constructor(
    @Inject(PaginateFindCatManager)
    paginateFindCatManager: ManagerAsync<CatPaginateFindQuery, Pagination<Cat>>,
  ) {
    super(paginateFindCatManager);
  }
}
