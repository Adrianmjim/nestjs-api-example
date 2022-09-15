import { ICommand } from '@nestjs/cqrs';

import { CatFindQuery } from '../query/CatFindQuery';
import { CatSetCommand } from './CatSetCommand';

export class CatUpdateCommand implements ICommand {
  public constructor(public readonly findQuery: CatFindQuery, public readonly setCommand: CatSetCommand) {}
}
