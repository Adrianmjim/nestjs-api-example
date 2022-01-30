import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { Converter } from '../../../domain/service/Converter';
import { InsertAdapter } from '../../../domain/service/InsertAdapter';

@Injectable()
export class InsertTypeOrmAdapter<TModel, TModelDb, TQuery> implements InsertAdapter<TModel, TQuery> {
  public constructor(
    private readonly repository: Repository<TModelDb>,
    private readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    private readonly queryToTypeOrmQueryConverter: Converter<TQuery, DeepPartial<TModelDb>>,
  ) {}

  public async insertOne(query: TQuery): Promise<TModel> {
    const typeOrmQuery: DeepPartial<TModelDb> = this.queryToTypeOrmQueryConverter.convert(query);
    const modelDb: TModelDb = await this.repository.save(typeOrmQuery);
    const model: TModel = this.modelDbToModelConverter.convert(modelDb);

    return model;
  }
}
