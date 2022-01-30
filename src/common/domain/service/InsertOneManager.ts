import { Injectable } from '@nestjs/common';
import { InsertAdapter } from './InsertAdapter';
import { Manager } from './Manager';

@Injectable()
export class InsertOneManager<TModel, TQuery> implements Manager<TQuery, TModel> {
  public constructor(private readonly insertAdapter: InsertAdapter<TModel, TQuery>) {}

  public async manage(query: TQuery): Promise<TModel> {
    return this.insertAdapter.insertOne(query);
  }
}
