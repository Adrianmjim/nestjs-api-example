import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserDeleteCommand } from '../../../domain/command/UserDeleteCommand';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserDeleteCommandToUserDeleteQueryMikroOrmConverterAsync extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  UserDeleteCommand,
  ObjectQuery<UserMikroOrm>
> {
  protected async convertToEntityDeleteQueryMikroOrm(
    _input: UserDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<UserMikroOrm>> {
    const userDeleteQueryMikroOrm: ObjectQuery<UserMikroOrm> = {
      ...(baseEntityDeleteQueryMikroOrm as ObjectQuery<UserMikroOrm>),
    };

    return userDeleteQueryMikroOrm;
  }
}
