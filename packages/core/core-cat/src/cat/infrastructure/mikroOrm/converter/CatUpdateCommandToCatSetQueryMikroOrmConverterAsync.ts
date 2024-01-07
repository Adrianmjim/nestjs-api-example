import { EntityData } from '@mikro-orm/core';
import { Injectable, Inject } from '@nestjs/common';
import {
  BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync } from './CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';

@Injectable()
export class CatUpdateCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatUpdateCommand,
  EntityData<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      EntityData<CatMikroOrm>
    >,
  ) {
    super(catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync);
  }
}
