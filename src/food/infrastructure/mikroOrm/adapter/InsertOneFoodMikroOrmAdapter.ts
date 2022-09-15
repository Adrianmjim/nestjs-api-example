import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { InsertOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/InsertOneMikroOrmAdapter';
import { FoodInsertOneCommand } from '../../../domain/command/FoodInsertOneCommand';
import { Food } from '../../../domain/model/Food';
import { FoodInsertCommandToFoodInsertQueryMikroOrmConverterAsync } from '../converter/FoodInsertCommandToFoodInsertQueryMikroOrmConverterAsync';
import { FoodMikroOrmToFoodConverterAsync } from '../converter/FoodMikroOrmToFoodConverterAsync';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class InsertOneFoodMikroOrmAdapter extends InsertOneMikroOrmAdapter<FoodInsertOneCommand, FoodMikroOrm, Food> {
  public constructor(
    @InjectRepository(FoodMikroOrm) foodMikroOrmRepository: EntityRepository<FoodMikroOrm>,
    @Inject(FoodInsertCommandToFoodInsertQueryMikroOrmConverterAsync)
    foodInsertOneCommandToFoodInserOneQueryMikroOrmConverterAsync: ConverterAsync<
      FoodInsertOneCommand,
      RequiredEntityData<FoodMikroOrm>
    >,
    @Inject(FoodMikroOrmToFoodConverterAsync) foodMikroOrmToFoodConverterAsync: ConverterAsync<FoodMikroOrm, Food>,
  ) {
    super(
      foodMikroOrmRepository,
      foodInsertOneCommandToFoodInserOneQueryMikroOrmConverterAsync,
      foodMikroOrmToFoodConverterAsync,
    );
  }
}
