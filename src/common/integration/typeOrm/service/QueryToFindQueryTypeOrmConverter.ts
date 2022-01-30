import { FindConditions, QueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { Converter } from '../../../domain/service/Converter';

export type QueryToFindQueryTypeOrmConverter<TModelDb, TQuery> =
  | Converter<TQuery, FindConditions<TModelDb>>
  | Converter<TQuery, QueryBuilder<TModelDb> & WhereExpressionBuilder, QueryBuilder<TModelDb> & WhereExpressionBuilder>;
