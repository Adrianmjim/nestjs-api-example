import { EntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { FoodSetCommand } from '../../../domain/command/FoodSetCommand';
import { FoodUpdateCommand } from '../../../domain/command/FoodUpdateCommand';
import { FoodMikroOrm } from '../model/FoodMikroOrm';
import { FoodSetCommandToFoodSetQueryMikroOrmConverterAsync } from './FoodSetCommandToFoodSetQueryMikroOrmConverterAsync';

@Injectable()
export class FoodUpdateCommandToFoodSetQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  FoodUpdateCommand,
  EntityData<FoodMikroOrm>
> {
  public constructor(
    @Inject(FoodSetCommandToFoodSetQueryMikroOrmConverterAsync)
    foodSetCommandToFoodSetQueryMikroOrmConverterAsync: ConverterAsync<FoodSetCommand, EntityData<FoodMikroOrm>>,
  ) {
    super(foodSetCommandToFoodSetQueryMikroOrmConverterAsync);
  }
}
