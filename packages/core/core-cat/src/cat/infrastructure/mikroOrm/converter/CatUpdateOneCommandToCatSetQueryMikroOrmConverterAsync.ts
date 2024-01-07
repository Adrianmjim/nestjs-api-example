import { EntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSetCommandToCatSetQueryMikroOrmConverterAsync } from './CatSetCommandToCatSetQueryMikroOrmConverterAsync';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';

@Injectable()
export class CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatUpdateOneCommand,
  EntityData<CatMikroOrm>
> {
  public constructor(
    @Inject(CatSetCommandToCatSetQueryMikroOrmConverterAsync)
    catSetCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<CatSetCommand, EntityData<CatMikroOrm>>,
  ) {
    super(catSetCommandToCatSetQueryMikroOrmConverterAsync);
  }
}
