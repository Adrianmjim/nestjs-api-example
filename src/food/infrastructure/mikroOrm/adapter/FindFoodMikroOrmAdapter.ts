import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindMikroOrmAdapter';
import { Food } from '../../../domain/model/Food';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodFindQueryToFoodFindQueryMikroOrmConverterAsync } from '../converter/FoodFindQueryToFoodFindQueryMikroOrmConverterAsync';
import { FoodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync } from '../converter/FoodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync';
import { FoodMikroOrmToFoodConverterAsync } from '../converter/FoodMikroOrmToFoodConverterAsync';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FindFoodMikroOrmAdapter extends FindMikroOrmAdapter<FoodFindQuery, FoodMikroOrm, Food> {
  public constructor(
    @InjectRepository(FoodMikroOrm) foodMikroOrmRepository: EntityRepository<FoodMikroOrm>,
    @Inject(FoodFindQueryToFoodFindQueryMikroOrmConverterAsync)
    foodFindQueryToFoodFindQueryMikroOrmConverterAsync: ConverterAsync<FoodFindQuery, ObjectQuery<FoodMikroOrm>>,
    @Inject(FoodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync)
    foodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync: ConverterAsync<FoodFindQuery, FindOptions<FoodMikroOrm>>,
    @Inject(FoodMikroOrmToFoodConverterAsync) foodMikroOrmToFoodConverterAsync: ConverterAsync<FoodMikroOrm, Food>,
  ) {
    super(
      foodMikroOrmRepository,
      foodFindQueryToFoodFindQueryMikroOrmConverterAsync,
      foodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync,
      foodMikroOrmToFoodConverterAsync,
    );
  }
}
