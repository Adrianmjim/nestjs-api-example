import { AnyEntity, FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntitySortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { Converter } from '../../../domain/converter/Converter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindQuery,
  TOutput extends AnyEntity,
> implements ConverterAsync<TInput, FindOptions<TOutput>>
{
  public constructor(
    private readonly baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter: Converter<
      BaseEntitySortKeyAndOrderType[],
      QueryOrderMap<TOutput>[]
    >,
  ) {}

  public async convert(input: TInput): Promise<FindOptions<TOutput>> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindOptionsQueryMikroOrm(input);

    const output: FindOptions<TOutput> = await this.convertToSpecificEntityFindOptionsQueryMikroOrm(
      input,
      baseEntityFindOptionsQueryMikroOrm,
    );

    return output;
  }

  private async convertToBaseEntityFindOptionsQueryMikroOrm(input: TInput): Promise<FindOptions<BaseEntityMikroOrm>> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {};

    if (input.sortKeyAndOrderTypes !== undefined) {
      baseEntityFindOptionsQueryMikroOrm.orderBy =
        this.baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert(
          input.sortKeyAndOrderTypes,
        );
    }

    return baseEntityFindOptionsQueryMikroOrm;
  }

  protected abstract convertToSpecificEntityFindOptionsQueryMikroOrm(
    input: TInput,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<TOutput>>;
}
