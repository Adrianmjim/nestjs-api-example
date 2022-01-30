import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { Manager } from '../../domain/service/Manager';

@Injectable()
export class FindOneQueryHandler<TQuery extends IQuery, TModel> implements IQueryHandler<TQuery, TModel | undefined> {
  public constructor(private readonly findOneManager: Manager<TQuery, TModel | undefined>) {}

  public async execute(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findOneManager.manage(query);

    return modelOrUndefined;
  }
}
