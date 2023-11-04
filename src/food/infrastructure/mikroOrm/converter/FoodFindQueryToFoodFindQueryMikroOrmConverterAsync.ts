import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodFindQueryToFoodFindQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  FoodFindQuery,
  ObjectQuery<FoodMikroOrm>
> {
  protected async convertToEntityFindQueryMikroOrm(
    input: FoodFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<FoodMikroOrm>> {
    const foodFindQueryMikroOrm: ObjectQuery<FoodMikroOrm> = {
      ...(baseEntityFindQueryMikroOrm as ObjectQuery<FoodMikroOrm>),
    };

    return foodFindQueryMikroOrm;
  }
}
