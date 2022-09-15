import { Inject, Injectable } from '@nestjs/common';

import { DeleteAdapter } from '../../../common/domain/adapter/DeleteAdapter';
import { DeleteManager } from '../../../common/domain/manager/DeleteManager';
import { DeleteFoodMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/DeleteFoodMikroOrmAdapter';
import { FoodDeleteCommand } from '../command/FoodDeleteCommand';

@Injectable()
export class DeleteFoodManager extends DeleteManager<FoodDeleteCommand> {
  public constructor(@Inject(DeleteFoodMikroOrmAdapter) deleteFoodMikroOrmAdapter: DeleteAdapter<FoodDeleteCommand>) {
    super(deleteFoodMikroOrmAdapter);
  }
}
