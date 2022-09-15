import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodInsertOneCommand } from '../../../domain/command/FoodInsertOneCommand';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodInsertCommandToFoodInsertQueryMikroOrmConverterAsync extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  FoodInsertOneCommand,
  RequiredEntityData<FoodMikroOrm>
> {
  protected async convertToEntityInsertOneQueryMikroOrm(
    input: FoodInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<FoodMikroOrm>> {
    const foodInsertOneQueryMikroOrm: RequiredEntityData<FoodMikroOrm> = {
      ...baseEntityInsertOneQueryMikroOrm,
      amount: input.amount,
      name: input.name,
      prize: input.prize,
    };

    return foodInsertOneQueryMikroOrm;
  }
}
