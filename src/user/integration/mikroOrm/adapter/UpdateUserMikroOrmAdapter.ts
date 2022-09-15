import { EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { UpdateMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/UpdateMikroOrmAdapter';
import { UserUpdateCommand } from '../../../domain/command/UserUpdateCommand';
import { UserUpdateCommandToUserFindQueryMikroOrmConverterAsync } from '../converter/UserUpdateCommandToUserFindQueryMikroOrmConverterAsync';
import { UserUpdateCommandToUserSetQueryMikroOrmConverterAsync } from '../converter/UserUpdateCommandToUserSetQueryMikroOrmConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class UpdateUserMikroOrmAdapter extends UpdateMikroOrmAdapter<UserUpdateCommand, UserMikroOrm> {
  public constructor(
    @InjectRepository(UserMikroOrm) userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserUpdateCommandToUserFindQueryMikroOrmConverterAsync)
    userUpdateCommandToUserFindQueryMikroOrmConverterAsync: ConverterAsync<
      UserUpdateCommand,
      ObjectQuery<UserMikroOrm>
    >,
    @Inject(UserUpdateCommandToUserSetQueryMikroOrmConverterAsync)
    userUpdateCommandToUserSetQueryMikroOrmConverterAsync: ConverterAsync<UserUpdateCommand, EntityData<UserMikroOrm>>,
  ) {
    super(
      userMikroOrmRepository,
      userUpdateCommandToUserFindQueryMikroOrmConverterAsync,
      userUpdateCommandToUserSetQueryMikroOrmConverterAsync,
    );
  }
}
