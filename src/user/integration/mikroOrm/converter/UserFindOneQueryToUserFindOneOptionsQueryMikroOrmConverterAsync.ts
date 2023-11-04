import { FindOneOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserFindOneQuery } from '../../../domain/query/UserFindOneQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserFindOneQueryToUserFindOneOptionsQueryMikroOrmConverterAsync extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  UserFindOneQuery,
  FindOneOptions<UserMikroOrm>
> {
  protected async convertToEntityFindOneOptionsQueryMikroOrm(
    _input: UserFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<UserMikroOrm>> {
    const userFindOneOptionsQueryMikroOrm: FindOneOptions<UserMikroOrm> = {
      ...(baseEntityFindOneOptionsQueryMikroOrm as unknown as FindOneOptions<UserMikroOrm>),
    };

    return userFindOneOptionsQueryMikroOrm;
  }
}
