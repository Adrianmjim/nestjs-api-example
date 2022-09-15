import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { InsertOneCommandHandler } from '../../../common/application/commandHandler/InsertOneCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FoodInsertOneCommand } from '../../domain/command/FoodInsertOneCommand';
import { InsertOneFoodManager } from '../../domain/manager/InsertOneFoodManager';
import { Food } from '../../domain/model/Food';

@CommandHandler(FoodInsertOneCommand)
export class FoodInsertCommandHandler extends InsertOneCommandHandler<FoodInsertOneCommand, Food> {
  public constructor(@Inject(InsertOneFoodManager) insertOneFoodManager: ManagerAsync<FoodInsertOneCommand, Food>) {
    super(insertOneFoodManager);
  }
}
