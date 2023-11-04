import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindMikroOrmAdapter';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserFindQueryToUserFindQueryMikroOrmConverterAsync } from '../converter/UserFindQueryToUserFindQueryMikroOrmConverterAsync';
import { UserFindQueryToUserFindQueryOptionsMikroOrmConverterAsync } from '../converter/UserFindQueryToUserFindQueryOptionsMikroOrmConverterAsync';
import { UserMikroOrmToUserConverterAsync } from '../converter/UserMikroOrmToUserConverterAsync';
import { UserMikroOrm } from '../model/UserMikroOrm';

@Injectable()
export class FindUserMikroOrmAdapter extends FindMikroOrmAdapter<UserFindQuery, UserMikroOrm, User> {
  public constructor(
    @InjectRepository(UserMikroOrm) userMikroOrmRepository: EntityRepository<UserMikroOrm>,
    @Inject(UserFindQueryToUserFindQueryMikroOrmConverterAsync)
    userFindQueryToUserFindQueryMikroOrmConverterAsync: ConverterAsync<UserFindQuery, ObjectQuery<UserMikroOrm>>,
    @Inject(UserFindQueryToUserFindQueryOptionsMikroOrmConverterAsync)
    userFindQueryToUserFindQueryOptionsMikroOrmConverterAsync: ConverterAsync<UserFindQuery, FindOptions<UserMikroOrm>>,
    @Inject(UserMikroOrmToUserConverterAsync) userMikroOrmToUserConverterAsync: ConverterAsync<UserMikroOrm, User>,
  ) {
    super(
      userMikroOrmRepository,
      userFindQueryToUserFindQueryMikroOrmConverterAsync,
      userFindQueryToUserFindQueryOptionsMikroOrmConverterAsync,
      userMikroOrmToUserConverterAsync,
    );
  }
}
