import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertOneCommandHandler } from '../../../common/application/handler/InsertOneCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { FoodInsertCommand } from '../../domain/command/FoodInsertCommand';
import { InsertFoodManager } from '../../domain/manager/InsertFoodManager';
import { Food } from '../../domain/model/Food';

@CommandHandler(FoodInsertCommand)
export class FoodInsertCommandHandler extends InsertOneCommandHandler<FoodInsertCommand, Food> {
  public constructor(@Inject(InsertFoodManager) insertFoodManager: Manager<FoodInsertCommand, Food>) {
    super(insertFoodManager);
  }
}
