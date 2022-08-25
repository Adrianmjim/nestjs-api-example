import { Injectable } from '@nestjs/common';
import { Converter } from '../../../../common/domain/service/Converter';
import { Food } from '../../../domain/model/Food';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class FoodTypeOrmToFoodConverter implements Converter<FoodTypeOrm, Food> {
  public convert(input: FoodTypeOrm): Food {
    const food: Food = {
      amount: input.amount,
      id: input.id,
      name: input.name,
      prize: input.prize,
    };

    return food;
  }
}
