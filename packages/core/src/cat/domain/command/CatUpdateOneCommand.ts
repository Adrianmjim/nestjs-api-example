import { BaseEntityUpdateOneCommand } from '../../../common/domain/command/BaseEntityUpdateOneCommand';
import { CatFindQuery } from '../query/CatFindQuery';
import { CatSetCommand } from './CatSetCommand';

export class CatUpdateOneCommand implements BaseEntityUpdateOneCommand {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly setCommand: CatSetCommand,
  ) {}
}
