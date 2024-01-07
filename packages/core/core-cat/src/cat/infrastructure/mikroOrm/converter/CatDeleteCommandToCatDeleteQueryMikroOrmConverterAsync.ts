import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm, BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';

@Injectable()
export class CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  CatDeleteCommand,
  ObjectQuery<CatMikroOrm>
> {
  protected async convertToSpecificEntityDeleteQueryMikroOrm(
    _input: CatDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<CatMikroOrm>> {
    const catDeleteQueryMikroOrm: ObjectQuery<CatMikroOrm> = {
      ...(baseEntityDeleteQueryMikroOrm as ObjectQuery<CatMikroOrm>),
    };

    return catDeleteQueryMikroOrm;
  }
}
