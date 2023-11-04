import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserInsertCommandToUserInsertQueryMikroOrmConverterAsync extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  UserInsertOneCommand,
  RequiredEntityData<UserMikroOrm>
> {
  protected async convertToEntityInsertOneQueryMikroOrm(
    input: UserInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<UserMikroOrm>> {
    const UserInsertOneQueryMikroOrm: RequiredEntityData<UserMikroOrm> = {
      ...baseEntityInsertOneQueryMikroOrm,
      age: input.age,
      email: input.email,
      name: input.name,
      surname: input.surname,
    };

    return UserInsertOneQueryMikroOrm;
  }
}
