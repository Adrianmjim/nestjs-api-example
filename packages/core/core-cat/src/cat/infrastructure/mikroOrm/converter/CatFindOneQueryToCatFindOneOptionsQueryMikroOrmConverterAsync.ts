import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync,
  Converter,
} from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm, BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from './CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';

@Injectable()
export class CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  CatFindOneQuery,
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

  protected async convertToSpecificEntityFindOneOptionsQueryMikroOrm(
    _input: CatFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<CatMikroOrm>> {
    const catFindOneOptionsQueryMikroOrm: FindOneOptions<CatMikroOrm> = {
      ...(baseEntityFindOneOptionsQueryMikroOrm as unknown as FindOneOptions<CatMikroOrm>),
    };

    return catFindOneOptionsQueryMikroOrm;
  }
}
