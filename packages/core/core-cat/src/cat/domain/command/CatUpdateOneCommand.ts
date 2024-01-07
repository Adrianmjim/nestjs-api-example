import { BaseEntityUpdateOneCommand } from '@nestjs-api-example/core-common/command';

import { CatSetCommand } from './CatSetCommand';
import { CatFindQuery } from '../query/CatFindQuery';

export class CatUpdateOneCommand implements BaseEntityUpdateOneCommand {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly setCommand: CatSetCommand,
  ) {}
}
