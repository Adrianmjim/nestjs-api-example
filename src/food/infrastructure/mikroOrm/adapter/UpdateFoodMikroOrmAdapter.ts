import { EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { UpdateMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/UpdateMikroOrmAdapter';
import { FoodUpdateCommand } from '../../../domain/command/FoodUpdateCommand';
import { FoodUpdateCommandToFoodFindQueryMikroOrmConverterAsync } from '../converter/FoodUpdateCommandToFoodFindQueryMikroOrmConverterAsync';
import { FoodUpdateCommandToFoodSetQueryMikroOrmConverterAsync } from '../converter/FoodUpdateCommandToFoodSetQueryMikroOrmConverterAsync';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class UpdateFoodMikroOrmAdapter extends UpdateMikroOrmAdapter<FoodUpdateCommand, FoodMikroOrm> {
  public constructor(
    @InjectRepository(FoodMikroOrm) foodMikroOrmRepository: EntityRepository<FoodMikroOrm>,
    @Inject(FoodUpdateCommandToFoodFindQueryMikroOrmConverterAsync)
    foodUpdateCommandToFoodFindQueryMikroOrmConverterAsync: ConverterAsync<
      FoodUpdateCommand,
      ObjectQuery<FoodMikroOrm>
    >,
    @Inject(FoodUpdateCommandToFoodSetQueryMikroOrmConverterAsync)
    foodUpdateCommandToFoodSetQueryMikroOrmConverterAsync: ConverterAsync<FoodUpdateCommand, EntityData<FoodMikroOrm>>,
  ) {
    super(
      foodMikroOrmRepository,
      foodUpdateCommandToFoodFindQueryMikroOrmConverterAsync,
      foodUpdateCommandToFoodSetQueryMikroOrmConverterAsync,
    );
  }
}
