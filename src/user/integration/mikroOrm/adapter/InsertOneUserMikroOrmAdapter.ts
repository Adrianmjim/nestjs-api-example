import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { InsertOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/InsertOneMikroOrmAdapter';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { User } from '../../../domain/model/User';
import { UserInsertCommandToUserInsertQueryMikroOrmConverterAsync } from '../converter/UserInsertCommandToUserInsertQueryMikroOrmConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../converter/UserMikroOrmToUserConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class InsertOneUserMikroOrmAdapter extends InsertOneMikroOrmAdapter<UserInsertOneCommand, UserMikroOrm, User> {
  public constructor(
    @InjectRepository(UserMikroOrm) userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserInsertCommandToUserInsertQueryMikroOrmConverterAsync)
    userInsertOneCommandToUserInserOneQueryMikroOrmConverterAsync: ConverterAsync<
      UserInsertOneCommand,
      RequiredEntityData<UserMikroOrm>
    >,
    @Inject(UserMikroOrmToUserConverterAsync) userMikroOrmToUserConverterAsync: ConverterAsync<UserMikroOrm, User>,
  ) {
    super(
      userMikroOrmRepository,
      userInsertOneCommandToUserInserOneQueryMikroOrmConverterAsync,
      userMikroOrmToUserConverterAsync,
    );
  }
}
