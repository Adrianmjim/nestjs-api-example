import { FindConditions, QueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { Converter } from '../../../domain/service/Converter';

export type VirtualQueryToFindQueryTypeOrmConverter<TModelDb, TQuery> = Converter<
  TQuery,
  FindConditions<TModelDb> | (QueryBuilder<TModelDb> & WhereExpressionBuilder),
  QueryBuilder<TModelDb> & WhereExpressionBuilder
>;
