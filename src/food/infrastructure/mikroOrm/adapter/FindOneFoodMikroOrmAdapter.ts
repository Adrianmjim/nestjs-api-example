import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindOneMikroOrmAdapter';
import { Food } from '../../../domain/model/Food';
import { FoodFindOneQuery } from '../../../domain/query/FoodFindOneQuery';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync } from '../converter/FoodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync';
import { FoodFindQueryToFoodFindQueryMikroOrmConverterAsync } from '../converter/FoodFindQueryToFoodFindQueryMikroOrmConverterAsync';
import { FoodMikroOrmToFoodConverterAsync } from '../converter/FoodMikroOrmToFoodConverterAsync';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FindOneFoodMikroOrmAdapter extends FindOneMikroOrmAdapter<FoodFindOneQuery, FoodMikroOrm, Food> {
  public constructor(
    @InjectRepository(FoodMikroOrm) foodMikroOrmRepository: EntityRepository<FoodMikroOrm>,
    @Inject(FoodFindQueryToFoodFindQueryMikroOrmConverterAsync)
    foodFindQueryToFoodFindQueryMikroOrmConverterAsync: ConverterAsync<FoodFindQuery, ObjectQuery<FoodMikroOrm>>,
    @Inject(FoodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync)
    foodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      FoodFindQuery,
      FindOneOptions<FoodMikroOrm>
    >,
    @Inject(FoodMikroOrmToFoodConverterAsync) foodMikroOrmToFoodConverterAsync: ConverterAsync<FoodMikroOrm, Food>,
  ) {
    super(
      foodMikroOrmRepository,
      foodFindQueryToFoodFindQueryMikroOrmConverterAsync,
      foodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync,
      foodMikroOrmToFoodConverterAsync,
    );
  }
}
