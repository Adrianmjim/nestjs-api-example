import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertOneCommandHandler } from '../../../common/application/handler/InsertOneCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { UserInsertCommand } from '../../domain/command/UserInsertCommand';
import { InsertUserManager } from '../../domain/manager/InsertUserManager';
import { User } from '../../domain/model/User';

@CommandHandler(UserInsertCommand)
export class UserInsertCommandHandler extends InsertOneCommandHandler<UserInsertCommand, User> {
  public constructor(@Inject(InsertUserManager) insertUserManager: Manager<UserInsertCommand, User>) {
    super(insertUserManager);
  }
}
