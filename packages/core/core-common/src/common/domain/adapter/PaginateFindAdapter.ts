import { Pagination } from '@nestjs-api-example/core-entity/model';

export interface PaginateFindAdapter<TQuery, TModel> {
  paginateFind(query: TQuery): Promise<Pagination<TModel>>;
}
