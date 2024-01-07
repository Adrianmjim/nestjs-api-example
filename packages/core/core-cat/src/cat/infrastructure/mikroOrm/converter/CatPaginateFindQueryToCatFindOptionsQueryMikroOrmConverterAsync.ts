import { FindOptions } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';

@Injectable()
export class CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync extends AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync<
  CatPaginateFindQuery,
  CatMikroOrm
> {
  public constructor(
    @Inject(CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, FindOptions<CatMikroOrm>>,
  ) {
    super(catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync);
  }
}
