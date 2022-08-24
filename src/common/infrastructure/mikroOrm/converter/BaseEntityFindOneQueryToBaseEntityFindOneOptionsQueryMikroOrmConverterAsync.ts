import { FindOneOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindOneQuery,
  TOutput extends FindOneOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindOneOptionsQueryMikroOrm(input);

    const output: TOutput = await this.convertToEntityFindOneOptionsQueryMikroOrm(
      input,
      baseEntityFindOneOptionsQueryMikroOrm,
    );

    return output;
  }

  private async convertToBaseEntityFindOneOptionsQueryMikroOrm(
    _input: TInput,
  ): Promise<FindOneOptions<BaseEntityMikroOrm>> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOneOptionsQueryMikroOrm;
  }

  protected abstract convertToEntityFindOneOptionsQueryMikroOrm(
    input: TInput,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
