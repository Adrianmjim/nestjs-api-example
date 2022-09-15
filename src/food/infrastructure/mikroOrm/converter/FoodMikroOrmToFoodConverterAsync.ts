import { Injectable } from '@nestjs/common';

import { BaseEntity } from '../../../../common/domain/model/BaseEntity';
import { BaseEntityMikroOrmToBaseEntityConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityMikroOrmToBaseEntityConverterAsync';
import { Food } from '../../../domain/model/Food';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodMikroOrmToFoodConverterAsync extends BaseEntityMikroOrmToBaseEntityConverterAsync<FoodMikroOrm, Food> {
  protected async convertToEntity(input: FoodMikroOrm, baseEntity: BaseEntity): Promise<Food> {
    const food: Food = {
      ...baseEntity,
      amount: input.amount,
      id: input.id,
      name: input.name,
      prize: input.prize,
    };

    return food;
  }
}
