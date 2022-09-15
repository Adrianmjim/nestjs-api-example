import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { UserUpdateCommand } from '../../../domain/command/UserUpdateCommand';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserMikroOrm } from '../model/UserMikroOrm';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from './UserFindQueryToUserFindQueryMikroOrmConverterAsync';

@Injectable()
export class UserUpdateCommandToUserFindQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  UserUpdateCommand,
  ObjectQuery<UserMikroOrm>
> {
  public constructor(
    @Inject(UserFindQueryToUserFindQueryMikroOrmConverterAsync)
    userFindQueryToUserFindQueryMikroOrmConverterAsync: ConverterAsync<UserFindQuery, ObjectQuery<UserMikroOrm>>,
  ) {
    super(userFindQueryToUserFindQueryMikroOrmConverterAsync);
  }
}
