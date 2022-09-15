import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { FindOneQueryHandler } from '../../../common/application/queryHandler/FindOneQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindOneFoodManager } from '../../domain/manager/FindOneFoodManager';
import { Food } from '../../domain/model/Food';
import { FoodFindOneQuery } from '../../domain/query/FoodFindOneQuery';

@QueryHandler(FoodFindOneQuery)
export class FoodFindOneQueryHandler extends FindOneQueryHandler<FoodFindOneQuery, Food | undefined> {
  public constructor(@Inject(FindOneFoodManager) findOneFoodManager: ManagerAsync<FoodFindOneQuery, Food | undefined>) {
    super(findOneFoodManager);
  }
}
