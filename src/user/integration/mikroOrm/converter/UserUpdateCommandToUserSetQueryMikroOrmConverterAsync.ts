import { EntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { UserSetCommand } from '../../../domain/command/UserSetCommand';
import { UserUpdateCommand } from '../../../domain/command/UserUpdateCommand';
import { UserMikroOrm } from '../model/UserMikroOrm';
import { UserSetCommandToUserSetQueryMikroOrmConverterAsync } from './UserSetCommandToUserSetQueryMikroOrmConverterAsync';

@Injectable()
export class UserUpdateCommandToUserSetQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  UserUpdateCommand,
  EntityData<UserMikroOrm>
> {
  public constructor(
    @Inject(UserSetCommandToUserSetQueryMikroOrmConverterAsync)
    userSetCommandToUserSetQueryMikroOrmConverterAsync: ConverterAsync<UserSetCommand, EntityData<UserMikroOrm>>,
  ) {
    super(userSetCommandToUserSetQueryMikroOrmConverterAsync);
  }
}
