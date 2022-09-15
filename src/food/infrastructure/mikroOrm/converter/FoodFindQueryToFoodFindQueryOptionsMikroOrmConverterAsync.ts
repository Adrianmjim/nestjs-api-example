import { FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodFindQueryToFoodFindQueryOptionsMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  FoodFindQuery,
  FindOptions<FoodMikroOrm>
> {
  protected async convertToEntityFindOptionsQueryMikroOrm(
    _input: FoodFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<FoodMikroOrm>> {
    const foodFindOptionsQueryMikroOrm: FindOptions<FoodMikroOrm> = {
      ...(baseEntityFindOptionsQueryMikroOrm as unknown as FindOptions<FoodMikroOrm>),
    };

    return foodFindOptionsQueryMikroOrm;
  }
}
