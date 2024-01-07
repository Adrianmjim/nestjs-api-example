import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync,
  ConverterAsync,
} from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';

@Injectable()
export class CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync extends BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  CatUpdateOneCommand,
  ObjectQuery<CatMikroOrm>
> {
  public constructor(
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, ObjectQuery<CatMikroOrm>>,
  ) {
    super(catFindQueryToCatFindQueryMikroOrmConverterAsync);
  }
}
