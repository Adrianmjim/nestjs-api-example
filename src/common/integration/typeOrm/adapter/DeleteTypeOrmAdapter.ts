import { Injectable } from '@nestjs/common';
import { DeleteQueryBuilder, FindConditions, QueryBuilder, Repository } from 'typeorm';
import { DeleteAdapter } from '../../../domain/service/DeleteAdapter';
import { QueryToFindQueryTypeOrmConverter } from '../service/QueryToFindQueryTypeOrmConverter';
import { VirtualQueryToFindQueryTypeOrmConverter } from '../service/VirtualQueryToFindQueryTypeOrmConverter';

@Injectable()
export class DeleteTypeOrmAdapter<TModelDb, TQuery> implements DeleteAdapter<TQuery> {
  public constructor(
    private readonly repository: Repository<TModelDb>,
    private readonly queryToQueryTypeOrmConverter: QueryToFindQueryTypeOrmConverter<TModelDb, TQuery>,
  ) {}

  public async delete(query: TQuery): Promise<void> {
    const deleteQueryBuilder: DeleteQueryBuilder<TModelDb> = this.repository.createQueryBuilder().delete();
    const findQueryTypeOrmOrQueryBuilder: FindConditions<TModelDb> | QueryBuilder<TModelDb> = (
      this.queryToQueryTypeOrmConverter as VirtualQueryToFindQueryTypeOrmConverter<TModelDb, TQuery>
    ).convert(query, deleteQueryBuilder);

    if (findQueryTypeOrmOrQueryBuilder instanceof QueryBuilder) {
      await (findQueryTypeOrmOrQueryBuilder as DeleteQueryBuilder<TModelDb>).execute();
    } else {
      await this.repository.delete(findQueryTypeOrmOrQueryBuilder);
    }
  }
}
