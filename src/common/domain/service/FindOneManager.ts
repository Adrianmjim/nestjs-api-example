import { Injectable } from '@nestjs/common';
import { FindAdapter } from './FindAdapter';
import { Manager } from './Manager';

@Injectable()
export class FindOneManager<TModel, TQuery> implements Manager<TQuery, TModel | undefined> {
  public constructor(private readonly findAdapter: FindAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel | undefined> {
    const modelOrUndefined: TModel | undefined = await this.findAdapter.findOne(query);

    return modelOrUndefined;
  }
}
