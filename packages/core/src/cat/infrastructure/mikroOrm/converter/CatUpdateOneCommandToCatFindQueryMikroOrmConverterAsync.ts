import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindQueryMikroOrmConverterAsync';

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
