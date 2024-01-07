import { Injectable } from '@nestjs/common';
import { Pagination } from '@nestjs-api-example/core-entity/model';

import { ManagerAsync } from './ManagerAsync';
import { PaginateFindAdapter } from '../adapter/PaginateFindAdapter';

@Injectable()
export class PaginateFindManager<TQuery, TModel> implements ManagerAsync<TQuery, Pagination<TModel>> {
  public constructor(private readonly paginateFindAdapter: PaginateFindAdapter<TQuery, TModel>) {}

  public async manage(query: TQuery): Promise<Pagination<TModel>> {
    const paginationModel: Pagination<TModel> = await this.paginateFindAdapter.paginateFind(query);

    return paginationModel;
  }
}
