import { RequiredEntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from './CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';

@Injectable()
export class CatInsertCommandToCatInsertQueryMikroOrmConverterAsync extends BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync<
  CatInsertCommand,
  RequiredEntityData<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync)
    catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertOneCommand,
      RequiredEntityData<CatMikroOrm>
    >,
  ) {
    super(catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync);
  }
}
