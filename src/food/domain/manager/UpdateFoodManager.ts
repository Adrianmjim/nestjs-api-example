import { Inject, Injectable } from '@nestjs/common';

import { UpdateAdapter } from '../../../common/domain/adapter/UpdateAdapter';
import { UpdateManager } from '../../../common/domain/manager/UpdateManager';
import { UpdateFoodMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/UpdateFoodMikroOrmAdapter';
import { FoodUpdateCommand } from '../command/FoodUpdateCommand';

@Injectable()
export class UpdateFoodManager extends UpdateManager<FoodUpdateCommand> {
  public constructor(@Inject(UpdateFoodMikroOrmAdapter) updateFoodMikroOrmAdapter: UpdateAdapter<FoodUpdateCommand>) {
    super(updateFoodMikroOrmAdapter);
  }
}
