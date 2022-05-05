import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '../../../common/domain/service/FindAdapter';
import { FindManager } from '../../../common/domain/service/FindManager';
import { FindUserTypeOrmAdapter } from '../../integration/typeOrm/adpater/FindUserTypeOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindUserManager extends FindManager<User, UserFindQuery> {
  public constructor(@Inject(FindUserTypeOrmAdapter) findUserTypeOrmAdapter: FindAdapter<User, UserFindQuery>) {
    super(findUserTypeOrmAdapter);
  }
}
