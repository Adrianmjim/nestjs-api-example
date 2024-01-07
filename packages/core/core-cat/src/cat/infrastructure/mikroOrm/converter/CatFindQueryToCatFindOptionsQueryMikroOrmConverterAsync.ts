import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync,
  Converter,
} from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm, BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from './CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';

@Injectable()
export class CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  CatFindQuery,
  CatMikroOrm
> {
  public constructor(
    @Inject(CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter)
    catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter: Converter<
      CatSortKeyAndOrderType[],
      QueryOrderMap<CatMikroOrm>[]
    >,
  ) {
    super(catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter);
  }

  protected async convertToSpecificEntityFindOptionsQueryMikroOrm(
    _input: CatFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<CatMikroOrm>> {
    const catFindOptionsQueryMikroOrm: FindOptions<CatMikroOrm> = {
      ...(baseEntityFindOptionsQueryMikroOrm as unknown as FindOptions<CatMikroOrm>),
    };

    return catFindOptionsQueryMikroOrm;
  }
}
