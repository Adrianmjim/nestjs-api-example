import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '../../../common/domain/service/FindAdapter';
import { FindOneManager } from '../../../common/domain/service/FindOneManager';
import { FindUserTypeOrmAdapter } from '../../integration/typeOrm/model/adpater/FindUserTypeOrmAdapter';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@Injectable()
export class FindUserManager extends FindOneManager<User, UserFindQuery> {
  public constructor(@Inject(FindUserTypeOrmAdapter) findUserTypeOrmAdapter: FindAdapter<User, UserFindQuery>) {
    super(findUserTypeOrmAdapter);
  }
}
