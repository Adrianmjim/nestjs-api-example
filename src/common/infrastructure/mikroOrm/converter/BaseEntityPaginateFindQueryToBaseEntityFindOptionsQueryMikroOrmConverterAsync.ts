import { FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';

@Injectable()
export abstract class BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityPaginateFindQuery,
  TOutput extends FindOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityFindQuery,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindOptionsQueryMikroOrm: TOutput =
      await this.baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert(input.findQuery);

    baseEntityFindOptionsQueryMikroOrm.limit = input.paginationOptions.limit;
    baseEntityFindOptionsQueryMikroOrm.offset = Math.abs(
      input.paginationOptions.limit * (input.paginationOptions.page - 1),
    );

    return baseEntityFindOptionsQueryMikroOrm;
  }
}
