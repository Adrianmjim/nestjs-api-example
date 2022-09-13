import { Injectable } from '@nestjs/common';
import { FindConditions, In } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class FoodFindQueryToFoodFindQueryTypeOrmConverter
  implements Converter<FoodFindQuery, FindConditions<FoodTypeOrm>>
{
  public convert(input: FoodFindQuery): FindConditions<FoodTypeOrm> {
    const foodQueryTypeOrm: FindConditions<FoodTypeOrm> = {};

    if (input.ids !== undefined) {
      foodQueryTypeOrm.id = In(input.ids);
    }

    return foodQueryTypeOrm;
  }
}
