import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { FindQueryHandler } from '../../../common/application/handler/FindQueryHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { FindUserManager } from '../../domain/manager/FindUserManager';
import { User } from '../../domain/model/User';
import { UserFindQuery } from '../../domain/query/UserFindQuery';

@QueryHandler(UserFindQuery)
export class UserFindQueryHandler extends FindQueryHandler<UserFindQuery, User> {
  public constructor(@Inject(FindUserManager) findUserManager: Manager<UserFindQuery, User[]>) {
    super(findUserManager);
  }
}
