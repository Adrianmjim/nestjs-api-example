import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { DeleteMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/DeleteMikroOrmAdapter';
import { FoodDeleteCommand } from '../../../domain/command/FoodDeleteCommand';
import { FoodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync } from '../converter/FoodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class DeleteFoodMikroOrmAdapter extends DeleteMikroOrmAdapter<FoodDeleteCommand, FoodMikroOrm> {
  public constructor(
    @InjectRepository(FoodMikroOrm) foodMikroOrmRepository: EntityRepository<FoodMikroOrm>,
    @Inject(FoodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync)
    foodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync: ConverterAsync<
      FoodDeleteCommand,
      ObjectQuery<FoodMikroOrm>
    >,
  ) {
    super(foodMikroOrmRepository, foodDeleteCommandToFoodDeleteQueryMikroOrmConverterAsync);
  }
}
