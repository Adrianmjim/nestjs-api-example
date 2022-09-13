import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  TInput extends BaseEntityPaginateFindQuery,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityFindQuery,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryMikroOrm: TOutput =
      await this.baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(input.findQuery);

    return baseEntityFindQueryMikroOrm;
  }
}
