import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { DeleteCommandHandler } from '../../../common/application/commandHandler/DeleteCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FoodDeleteCommand } from '../../domain/command/FoodDeleteCommand';
import { DeleteFoodManager } from '../../domain/manager/DeleteFoodManager';

@CommandHandler(FoodDeleteCommand)
export class FoodDeleteCommandHandler extends DeleteCommandHandler<FoodDeleteCommand> {
  public constructor(@Inject(DeleteFoodManager) deleteFoodManager: ManagerAsync<FoodDeleteCommand>) {
    super(deleteFoodManager);
  }
}
