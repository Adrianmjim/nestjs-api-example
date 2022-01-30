import { Injectable } from '@nestjs/common';
import { FindConditions, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { Converter } from '../../../domain/service/Converter';
import { FindAdapter } from '../../../domain/service/FindAdapter';
import { QueryToFindQueryTypeOrmConverter } from '../service/QueryToFindQueryTypeOrmConverter';
import { VirtualQueryToFindQueryTypeOrmConverter } from '../service/VirtualQueryToFindQueryTypeOrmConverter';

@Injectable()
export class FindTypeOrmAdapter<TModel, TModelDb, TQuery> implements FindAdapter<TModel, TQuery> {
  public constructor(
    private readonly repository: Repository<TModelDb>,
    private readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    private readonly findQueryToFindQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<TModelDb, TQuery>,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const modelsDb: TModelDb[] = await this.innerFind(
      query,
      async (queryBuilder: SelectQueryBuilder<TModelDb>): Promise<TModelDb[]> => queryBuilder.getMany(),
      async (findConditions: FindConditions<TModelDb>): Promise<TModelDb[]> => this.repository.find(findConditions),
    );

    const models: TModel[] = modelsDb.map((modelDb: TModelDb) => this.modelDbToModelConverter.convert(modelDb));

    return models;
  }

  public async findOne(query: TQuery): Promise<TModel | undefined> {
    const modelDb: TModelDb | undefined = await this.innerFind(
      query,
      async (queryBuilder: SelectQueryBuilder<TModelDb>): Promise<TModelDb | undefined> => queryBuilder.getOne(),
      async (findConditions: FindConditions<TModelDb>): Promise<TModelDb | undefined> =>
        this.repository.findOne(findConditions),
    );

    let model: TModel | undefined;

    if (modelDb === undefined) {
      model = undefined;
    } else {
      model = this.modelDbToModelConverter.convert(modelDb);
    }

    return model;
  }

  private async innerFind<TOutputDb extends undefined | TModelDb | TModelDb[]>(
    query: TQuery,
    findByQueryBuilder: (queryBuilder: SelectQueryBuilder<TModelDb>) => Promise<TOutputDb>,
    findByFindConditions: (findConditions: FindConditions<TModelDb>) => Promise<TOutputDb>,
  ): Promise<TOutputDb> {
    const selectQueryBuilder: SelectQueryBuilder<TModelDb> = this.repository.createQueryBuilder();
    const findQueryTypeOrmOrQueryBuilder: FindConditions<TModelDb> | QueryBuilder<TModelDb> = (
      this.findQueryToFindQueryTypeOrmConverter as VirtualQueryToFindQueryTypeOrmConverter<TModelDb, TQuery>
    ).convert(query, selectQueryBuilder);

    let outputDb: TOutputDb;

    if (findQueryTypeOrmOrQueryBuilder instanceof QueryBuilder) {
      outputDb = await findByQueryBuilder(findQueryTypeOrmOrQueryBuilder as SelectQueryBuilder<TModelDb>);
    } else {
      outputDb = await findByFindConditions(findQueryTypeOrmOrQueryBuilder);
    }

    return outputDb;
  }
}
