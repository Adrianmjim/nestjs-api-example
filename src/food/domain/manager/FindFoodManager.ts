import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '../../../common/domain/service/FindAdapter';
import { FindManager } from '../../../common/domain/service/FindManager';
import { FindFoodTypeOrmAdapter } from '../../infrastructure/typeOrm/adapter/FindFoodTypeOrmAdapter';
import { Food } from '../model/Food';
import { FoodFindQuery } from '../query/FoodFindQuery';

@Injectable()
export class FindFoodManager extends FindManager<Food, FoodFindQuery> {
  public constructor(@Inject(FindFoodTypeOrmAdapter) findFoodTypeOrmAdapter: FindAdapter<Food, FoodFindQuery>) {
    super(findFoodTypeOrmAdapter);
  }
}
