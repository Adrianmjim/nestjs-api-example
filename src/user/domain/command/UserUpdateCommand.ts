import { ICommand } from '@nestjs/cqrs';

import { UserFindQuery } from '../query/UserFindQuery';
import { UserSetCommand } from './UserSetCommand';

export class UserUpdateCommand implements ICommand {
  public constructor(public readonly findQuery: UserFindQuery, public readonly setCommand: UserSetCommand) {}
}
