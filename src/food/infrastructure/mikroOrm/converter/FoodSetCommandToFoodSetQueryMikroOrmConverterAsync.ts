import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodSetCommand } from '../../../domain/command/FoodSetCommand';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodSetCommandToFoodSetQueryMikroOrmConverterAsync extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  FoodSetCommand,
  EntityData<FoodMikroOrm>
> {
  protected async convertToEntitySetQueryMikroOrm(
    input: FoodSetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<FoodMikroOrm>> {
    const foodSetQueryMikroOrm: EntityData<FoodMikroOrm> = {
      ...baseEntitySetQueryMikroOrm,
    };

    if (input.amount !== undefined) {
      foodSetQueryMikroOrm.amount = input.amount;
    }

    if (input.name !== undefined) {
      foodSetQueryMikroOrm.name = input.name;
    }

    if (input.prize !== undefined) {
      foodSetQueryMikroOrm.prize = input.prize;
    }

    return foodSetQueryMikroOrm;
  }
}
