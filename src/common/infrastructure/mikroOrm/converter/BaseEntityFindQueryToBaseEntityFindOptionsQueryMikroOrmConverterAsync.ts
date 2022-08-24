import { FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindQuery,
  TOutput extends FindOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindOptionsQueryMikroOrm(input);

    const output: TOutput = await this.convertToEntityFindOptionsQueryMikroOrm(
      input,
      baseEntityFindOptionsQueryMikroOrm,
    );

    return output;
  }

  private async convertToBaseEntityFindOptionsQueryMikroOrm(_input: TInput): Promise<FindOptions<BaseEntityMikroOrm>> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOptionsQueryMikroOrm;
  }

  protected abstract convertToEntityFindOptionsQueryMikroOrm(
    input: TInput,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
