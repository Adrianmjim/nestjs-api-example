import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindOneQuery,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindQueryMikroOrm(input);

    const output: TOutput = await this.convertToEntityFindQueryMikroOrm(input, baseEntityFindQueryMikroOrm);

    return output;
  }

  private async convertToBaseEntityFindQueryMikroOrm(input: TInput): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {};

    if (input.ids !== undefined) {
      baseEntityFindQueryMikroOrm.id = { $in: input.ids };
    }

    return baseEntityFindQueryMikroOrm;
  }

  protected abstract convertToEntityFindQueryMikroOrm(
    input: TInput,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
