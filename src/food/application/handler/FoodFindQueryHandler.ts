import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { FindQueryHandler } from '../../../common/application/queryHandler/FindQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindFoodManager } from '../../domain/manager/FindFoodManager';
import { Food } from '../../domain/model/Food';
import { FoodFindQuery } from '../../domain/query/FoodFindQuery';

@QueryHandler(FoodFindQuery)
export class FoodFindQueryHandler extends FindQueryHandler<FoodFindQuery, Food> {
  public constructor(@Inject(FindFoodManager) findFoodManager: ManagerAsync<FoodFindQuery, Food[]>) {
    super(findFoodManager);
  }
}
