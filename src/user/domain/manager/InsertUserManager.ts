import { Inject, Injectable } from '@nestjs/common';
import { InsertAdapter } from '../../../common/domain/service/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { InsertUserTypeOrmAdapter } from '../../integration/typeOrm/model/adpater/InsertUserTypeOrmAdapter';
import { UserInsertCommand } from '../command/UserInsertCommand';
import { User } from '../model/User';

@Injectable()
export class InsertUserManager extends InsertOneManager<User, UserInsertCommand> {
  public constructor(
    @Inject(InsertUserTypeOrmAdapter) insertUserTypeOrmAdapter: InsertAdapter<User, UserInsertCommand>,
  ) {
    super(insertUserTypeOrmAdapter);
  }
}
