import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntitySortKeyAndOrderType, OrderType } from '@nestjs-api-example/core-entity/model';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { Converter } from '../../../domain/converter/Converter';

@Injectable()
export abstract class BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  TInput extends BaseEntitySortKeyAndOrderType,
  TOutput extends QueryOrderMap<BaseEntityMikroOrm>,
> implements Converter<TInput, TOutput>
{
  public constructor(protected readonly orderTypeToQueryOrderMikroOrmConverter: Converter<OrderType, QueryOrder>) {}

  public convert(input: TInput): TOutput {
    const baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm> =
      this.convertToBaseEntityQueryOrderMapMikroOrm(input);

    const output: TOutput = this.convertToSpecificEntityQueryOrderMapMikroOrm(input, baseEntityQueryOrderMapMikroOrm);

    return output;
  }

  private convertToBaseEntityQueryOrderMapMikroOrm(input: TInput): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm> = {};

    if (input.createdAt !== undefined) {
      baseEntityQueryOrderMapMikroOrm.createdAt = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.createdAt);
    }

    if (input.id !== undefined) {
      baseEntityQueryOrderMapMikroOrm.id = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.id);
    }

    if (input.updatedAt !== undefined) {
      baseEntityQueryOrderMapMikroOrm.updatedAt = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.updatedAt);
    }

    return baseEntityQueryOrderMapMikroOrm;
  }

  protected abstract convertToSpecificEntityQueryOrderMapMikroOrm(
    input: TInput,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): TOutput;
}
