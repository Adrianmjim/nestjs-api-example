import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/FindTypeOrmAdapter';
import { Food } from '../../../domain/model/Food';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodFindQueryToFoodFindQueryTypeOrmConverter } from '../converter/FoodFindQueryToFoodFindQueryTypeOrmConverter';
import { FoodTypeOrmToFoodConverter } from '../converter/FoodTypeOrmToFoodConverter';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class FindFoodTypeOrmAdapter extends FindTypeOrmAdapter<Food, FoodTypeOrm, FoodFindQuery> {
  public constructor(
    @InjectRepository(FoodTypeOrm) repository: Repository<FoodTypeOrm>,
    @Inject(FoodTypeOrmToFoodConverter) foodTypeOrmToFoodConverter: Converter<FoodTypeOrm, Food>,
    @Inject(FoodFindQueryToFoodFindQueryTypeOrmConverter)
    foodFindQueryToFoodFindQueryTypeOrmConverter: Converter<FoodFindQuery, FindConditions<FoodTypeOrm>>,
  ) {
    super(repository, foodTypeOrmToFoodConverter, foodFindQueryToFoodFindQueryTypeOrmConverter);
  }
}
