import { PaginationOptions } from '@nestjs-api-example/core-entity/model';

import { AnyEntityFindQuery } from './AnyEntityFindQuery';

export interface AnyEntityPaginateFindQuery {
  findQuery: AnyEntityFindQuery;
  paginationOptions: PaginationOptions;
}
