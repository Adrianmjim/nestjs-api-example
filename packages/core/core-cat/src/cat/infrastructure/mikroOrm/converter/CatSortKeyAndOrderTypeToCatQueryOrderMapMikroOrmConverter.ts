import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter,
  Converter,
  OrderTypeToQueryOrderMikroOrmConverter,
} from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType, OrderType } from '@nestjs-api-example/core-entity/model';
import { BaseEntityMikroOrm, CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

@Injectable()
export class CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter extends BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  CatSortKeyAndOrderType,
  QueryOrderMap<CatMikroOrm>
> {
  public constructor(
    @Inject(OrderTypeToQueryOrderMikroOrmConverter)
    orderTypeToQueryOrderMikroOrmConverter: Converter<OrderType, QueryOrder>,
  ) {
    super(orderTypeToQueryOrderMikroOrmConverter);
  }

  protected convertToSpecificEntityQueryOrderMapMikroOrm(
    _input: CatSortKeyAndOrderType,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): QueryOrderMap<CatMikroOrm> {
    const catQueryOrderMapMikroOrm: QueryOrderMap<CatMikroOrm> = {
      ...baseEntityQueryOrderMapMikroOrm,
    };

    return catQueryOrderMapMikroOrm;
  }
}
