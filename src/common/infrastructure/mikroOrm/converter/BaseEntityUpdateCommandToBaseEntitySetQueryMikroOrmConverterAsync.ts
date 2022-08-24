import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  TInput extends BaseEntityUpdateCommand,
  TOutput extends EntityData<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntitySetCommand,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntitySetQueryMikroOrm: TOutput =
      await this.baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(input.setCommand);

    return baseEntitySetQueryMikroOrm;
  }
}
