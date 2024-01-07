import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '@nestjs-api-example/core-common/converter';
import { BaseEntityMikroOrm, CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSetCommand } from '../../../domain/command/CatSetCommand';

@Injectable()
export class CatSetCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatSetCommand,
  EntityData<CatMikroOrm>
> {
  protected async convertToSpecificEntitySetQueryMikroOrm(
    input: CatSetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<CatMikroOrm>> {
    const catSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      ...baseEntitySetQueryMikroOrm,
    };

    if (input.bornDate !== undefined) {
      catSetQueryMikroOrm.bornDate = input.bornDate;
    }

    if (input.color !== undefined) {
      catSetQueryMikroOrm.color = input.color;
    }

    if (input.name !== undefined) {
      catSetQueryMikroOrm.name = input.name;
    }

    return catSetQueryMikroOrm;
  }
}
