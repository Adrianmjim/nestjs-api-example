import { Inject, Injectable } from '@nestjs/common';

import { FindOneAdapter } from '../../../common/domain/adapter/FindOneAdapter';
import { FindOneManager } from '../../../common/domain/manager/FindOneManager';
import { FindOneMikroOrmAdapter } from '../../../common/infrastructure/mikroOrm/adapter/FindOneMikroOrmAdapter';
import { Food } from '../model/Food';
import { FoodFindOneQuery } from '../query/FoodFindOneQuery';

@Injectable()
export class FindOneFoodManager extends FindOneManager<FoodFindOneQuery, Food> {
  public constructor(@Inject(FindOneMikroOrmAdapter) findOneMikroOrmAdapter: FindOneAdapter<FoodFindOneQuery, Food>) {
    super(findOneMikroOrmAdapter);
  }
}
