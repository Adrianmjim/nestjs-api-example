import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateCommandHandler } from '../../../common/application/commandHandler/UpdateCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FoodUpdateCommand } from '../../domain/command/FoodUpdateCommand';
import { UpdateFoodManager } from '../../domain/manager/UpdateFoodManager';

@CommandHandler(FoodUpdateCommand)
export class FoodUpdateCommandHandler extends UpdateCommandHandler<FoodUpdateCommand> {
  public constructor(@Inject(UpdateFoodManager) updateFoodManager: ManagerAsync<FoodUpdateCommand>) {
    super(updateFoodManager);
  }
}
