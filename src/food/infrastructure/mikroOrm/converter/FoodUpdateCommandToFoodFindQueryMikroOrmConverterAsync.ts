import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { FoodUpdateCommand } from '../../../domain/command/FoodUpdateCommand';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodMikroOrm } from '../model/FoodMikroOrm';
import { FoodFindQueryToFoodFindQueryMikroOrmConverterAsync } from './FoodFindQueryToFoodFindQueryMikroOrmConverterAsync';

@Injectable()
export class FoodUpdateCommandToFoodFindQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  FoodUpdateCommand,
  ObjectQuery<FoodMikroOrm>
> {
  public constructor(
    @Inject(FoodFindQueryToFoodFindQueryMikroOrmConverterAsync)
    foodFindQueryToFoodFindQueryMikroOrmConverterAsync: ConverterAsync<FoodFindQuery, ObjectQuery<FoodMikroOrm>>,
  ) {
    super(foodFindQueryToFoodFindQueryMikroOrmConverterAsync);
  }
}
