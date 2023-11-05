import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';
import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from './CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';

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