import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { DeleteMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/DeleteMikroOrmAdapter';
import { UserDeleteCommand } from '../../../domain/command/UserDeleteCommand';
import { UserDeleteCommandToUserDeleteQueryMikroOrmConverterAsync } from '../converter/UserDeleteCommandToUserDeleteQueryMikroOrmConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class DeleteUserMikroOrmAdapter extends DeleteMikroOrmAdapter<UserDeleteCommand, UserMikroOrm> {
  public constructor(
    @InjectRepository(UserMikroOrm) userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserDeleteCommandToUserDeleteQueryMikroOrmConverterAsync)
    userDeleteCommandToUserDeleteQueryMikroOrmConverterAsync: ConverterAsync<
      UserDeleteCommand,
      ObjectQuery<UserMikroOrm>
    >,
  ) {
    super(userMikroOrmRepository, userDeleteCommandToUserDeleteQueryMikroOrmConverterAsync);
  }
}
