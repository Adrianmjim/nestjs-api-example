import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindQuery,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindQueryMikroOrm(input);

    const output: TOutput = await this.convertToSpecificEntityFindQueryMikroOrm(input, baseEntityFindQueryMikroOrm);

    return output;
  }

  private async convertToBaseEntityFindQueryMikroOrm(input: TInput): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {};

    if (input.ids !== undefined) {
      baseEntityFindQueryMikroOrm.id = { $in: input.ids };
    }

    return baseEntityFindQueryMikroOrm;
  }

  protected abstract convertToSpecificEntityFindQueryMikroOrm(
    input: TInput,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
