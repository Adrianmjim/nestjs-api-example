import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class FoodFindQueryToFoodFindQueryTypeOrmConverter
  implements Converter<FoodFindQuery, FindConditions<FoodTypeOrm>>
{
  public convert(input: FoodFindQuery): FindConditions<FoodTypeOrm> {
    const foodQueryTypeOrm: FindConditions<FoodTypeOrm> = {};

    if (input.id !== undefined) {
      foodQueryTypeOrm.id = input.id;
    }

    return foodQueryTypeOrm;
  }
}
