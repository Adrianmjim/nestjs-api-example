import { BaseEntityInsertCommand } from '../../../common/domain/command/BaseEntityInsertCommand';
import { CatInsertOneCommand } from './CatInsertOneCommand';

export class CatInsertCommand implements BaseEntityInsertCommand {
  public constructor(public readonly commands: CatInsertOneCommand[]) {}
}
