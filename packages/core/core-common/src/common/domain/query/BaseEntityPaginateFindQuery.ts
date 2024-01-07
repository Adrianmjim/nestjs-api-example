import { PaginationOptions } from '@nestjs-api-example/core-entity/model';

import { BaseEntityFindQuery } from './BaseEntityFindQuery';

export interface BaseEntityPaginateFindQuery {
  findQuery: BaseEntityFindQuery;
  paginationOptions: PaginationOptions;
}
