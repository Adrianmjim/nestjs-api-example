import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from '@nestjs-api-example/core-common/converter';
import { CatMikroOrm, BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';

@Injectable()
export class CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  CatInsertOneCommand,
  RequiredEntityData<CatMikroOrm>
> {
  protected async convertToSpecificEntityInsertOneQueryMikroOrm(
    input: CatInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<CatMikroOrm>> {
    const catInsertOneQueryMikroOrm: RequiredEntityData<CatMikroOrm> = {
      ...baseEntityInsertOneQueryMikroOrm,
      bornDate: input.bornDate,
      color: input.color,
      name: input.name,
    };

    return catInsertOneQueryMikroOrm;
  }
}
