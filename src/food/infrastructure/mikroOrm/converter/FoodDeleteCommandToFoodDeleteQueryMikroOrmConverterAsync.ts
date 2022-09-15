import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodDeleteCommand } from '../../../domain/command/FoodDeleteCommand';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  FoodDeleteCommand,
  ObjectQuery<FoodMikroOrm>
> {
  protected async convertToEntityDeleteQueryMikroOrm(
    input: FoodDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<FoodMikroOrm>> {
    const foodDeleteQueryMikroOrm: ObjectQuery<FoodMikroOrm> = {
      ...(baseEntityDeleteQueryMikroOrm as ObjectQuery<FoodMikroOrm>),
    };

    return foodDeleteQueryMikroOrm;
  }
}
