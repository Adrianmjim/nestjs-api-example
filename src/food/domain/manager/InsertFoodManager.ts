import { Inject, Injectable } from '@nestjs/common';
import { InsertAdapter } from '../../../common/domain/service/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { InsertFoodTypeOrmAdapter } from '../../integration/typeOrm/adapter/InsertFoodTypeOrmAdapter';
import { FoodInsertCommand } from '../command/FoodInsertCommand';
import { Food } from '../model/Food';

@Injectable()
export class InsertFoodManager extends InsertOneManager<Food, FoodInsertCommand> {
  public constructor(
    @Inject(InsertFoodTypeOrmAdapter) insertFoodTypeOrmAdapter: InsertAdapter<Food, FoodInsertCommand>,
  ) {
    super(insertFoodTypeOrmAdapter);
  }
}
