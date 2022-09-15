import { FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserFindQueryToUserFindQueryOptionsMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  UserFindQuery,
  FindOptions<UserMikroOrm>
> {
  protected async convertToEntityFindOptionsQueryMikroOrm(
    _input: UserFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<UserMikroOrm>> {
    const userFindOptionsQueryMikroOrm: FindOptions<UserMikroOrm> = {
      ...(baseEntityFindOptionsQueryMikroOrm as unknown as FindOptions<UserMikroOrm>),
    };

    return userFindOptionsQueryMikroOrm;
  }
}
