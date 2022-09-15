import { Inject, Injectable } from '@nestjs/common';

import { InsertOneAdapter } from '../../../common/domain/adapter/InsertOneAdapter';
import { InsertOneManager } from '../../../common/domain/manager/InsertOneManager';
import { InsertOneFoodMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertOneFoodMikroOrmAdapter';
import { FoodInsertOneCommand } from '../command/FoodInsertOneCommand';
import { Food } from '../model/Food';

@Injectable()
export class InsertOneFoodManager extends InsertOneManager<FoodInsertOneCommand, Food> {
  public constructor(
    @Inject(InsertOneFoodMikroOrmAdapter) insertOneFoodMikroOrmAdapter: InsertOneAdapter<FoodInsertOneCommand, Food>,
  ) {
    super(insertOneFoodMikroOrmAdapter);
  }
}
