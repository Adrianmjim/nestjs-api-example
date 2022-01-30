import { Injectable } from '@nestjs/common';
import { FindAdapter } from './FindAdapter';
import { Manager } from './Manager';

@Injectable()
export class FindManager<TModel, TQuery> implements Manager<TQuery, TModel[]> {
  public constructor(private readonly findAdapter: FindAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel[]> {
    const models: TModel[] = await this.findAdapter.find(query);

    return models;
  }
}
