import { Inject, Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindManager } from '../../../common/domain/manager/FindManager';
import { FindFoodMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindFoodMikroOrmAdapter';
import { Food } from '../model/Food';
import { FoodFindQuery } from '../query/FoodFindQuery';

@Injectable()
export class FindFoodManager extends FindManager<FoodFindQuery, Food> {
  public constructor(@Inject(FindFoodMikroOrmAdapter) findFoodMikroOrmAdapter: FindAdapter<FoodFindQuery, Food>) {
    super(findFoodMikroOrmAdapter);
  }
}
