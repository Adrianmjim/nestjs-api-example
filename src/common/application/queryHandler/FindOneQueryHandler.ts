import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class FindOneQueryHandler<TQuery extends IQuery, TModel> implements IQueryHandler<TQuery, TModel | null> {
  public constructor(
    private readonly findOneManager: Manager<TQuery, TModel | null> | ManagerAsync<TQuery, TModel | null>,
  ) {}

  public async execute(query: TQuery): Promise<TModel | null> {
    const modelOrNull: TModel | null = await this.findOneManager.manage(query);

    return modelOrNull;
  }
}
