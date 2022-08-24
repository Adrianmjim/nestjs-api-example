import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  TInput extends BaseEntityInsertOneCommand,
  TOutput extends RequiredEntityData<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm> =
      await this.convertToBaseEntityInsertOneQueryMikroOrm(input);

    const output: TOutput = await this.convertToEntityInsertOneQueryMikroOrm(input, baseEntityInsertOneQueryMikroOrm);

    return output;
  }

  private async convertToBaseEntityInsertOneQueryMikroOrm(
    input: TInput,
  ): Promise<RequiredEntityData<BaseEntityMikroOrm>> {
    const baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm> = {
      createdById: input.createdById,
    };

    return baseEntityInsertOneQueryMikroOrm;
  }

  protected abstract convertToEntityInsertOneQueryMikroOrm(
    input: TInput,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
