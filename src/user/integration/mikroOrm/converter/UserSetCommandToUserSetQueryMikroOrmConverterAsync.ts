import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { UserSetCommand } from '../../../domain/command/UserSetCommand';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UserSetCommandToUserSetQueryMikroOrmConverterAsync extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  UserSetCommand,
  EntityData<UserMikroOrm>
> {
  protected async convertToEntitySetQueryMikroOrm(
    input: UserSetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<UserMikroOrm>> {
    const userSetQueryMikroOrm: EntityData<UserMikroOrm> = {
      ...baseEntitySetQueryMikroOrm,
    };

    if (input.age !== undefined) {
      userSetQueryMikroOrm.age = input.age;
    }

    if (input.email !== undefined) {
      userSetQueryMikroOrm.email = input.email;
    }

    if (input.name !== undefined) {
      userSetQueryMikroOrm.name = input.name;
    }

    if (input.surname !== undefined) {
      userSetQueryMikroOrm.surname = input.surname;
    }

    return userSetQueryMikroOrm;
  }
}
