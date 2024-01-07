import { ObjectQuery } from '@mikro-orm/core';
import { Injectable, Inject } from '@nestjs/common';
import {
  BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync } from './CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';

@Injectable()
export class CatUpdateCommandToCatFindQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  CatUpdateCommand,
  ObjectQuery<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      ObjectQuery<CatMikroOrm>
    >,
  ) {
    super(catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync);
  }
}
