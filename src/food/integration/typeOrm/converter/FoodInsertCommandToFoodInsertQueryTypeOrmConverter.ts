import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FoodInsertCommand } from '../../../domain/command/FoodInsertCommand';
import { FoodTypeOrm } from '../model/FoodTypeOrm';

@Injectable()
export class FoodInsertCommandToFoodInsertQueryTypeOrmConverter
  implements Converter<FoodInsertCommand, DeepPartial<FoodTypeOrm>>
{
  public convert(input: FoodInsertCommand): DeepPartial<FoodTypeOrm> {
    const foodInsertQueryTypeOrm: DeepPartial<FoodTypeOrm> = {
      amount: input.amount,
      name: input.name,
      prize: input.prize,
    };

    return foodInsertQueryTypeOrm;
  }
}
