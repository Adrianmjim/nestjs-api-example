import { QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter,
  Converter,
} from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter } from './CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter';

@Injectable()
export class CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter extends BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
  CatSortKeyAndOrderType[],
  QueryOrderMap<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter)
    catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter: Converter<
      CatSortKeyAndOrderType,
      QueryOrderMap<CatMikroOrm>
    >,
  ) {
    super(catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter);
  }
}
