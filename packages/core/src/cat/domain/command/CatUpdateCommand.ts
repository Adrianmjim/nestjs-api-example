import { BaseEntityUpdateCommand } from '../../../common/domain/command/BaseEntityUpdateCommand';
import { CatUpdateOneCommand } from './CatUpdateOneCommand';

export class CatUpdateCommand implements BaseEntityUpdateCommand {
  public constructor(public readonly commands: CatUpdateOneCommand[]) {}
}
