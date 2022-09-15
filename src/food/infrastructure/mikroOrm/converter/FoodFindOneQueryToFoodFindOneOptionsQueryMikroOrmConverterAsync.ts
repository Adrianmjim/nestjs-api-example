import { FindOneOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { FoodFindOneQuery } from '../../../domain/query/FoodFindOneQuery';
import { FoodMikroOrm } from '../model/FoodMikroOrm';

@Injectable()
export class FoodFindOneQueryToFoodFindOneOptionsQueryMikroOrmConverterAsync extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  FoodFindOneQuery,
  FindOneOptions<FoodMikroOrm>
> {
  protected async convertToEntityFindOneOptionsQueryMikroOrm(
    _input: FoodFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<FoodMikroOrm, never>> {
    const foodFindOneOptionsQueryMikroOrm: FindOneOptions<FoodMikroOrm> = {
      ...(baseEntityFindOneOptionsQueryMikroOrm as unknown as FindOneOptions<FoodMikroOrm>),
    };

    return foodFindOneOptionsQueryMikroOrm;
  }
}
