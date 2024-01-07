import { BaseEntityInsertCommand } from '@nestjs-api-example/core-common/command';

import { CatInsertOneCommand } from './CatInsertOneCommand';

export class CatInsertCommand implements BaseEntityInsertCommand {
  public constructor(public readonly commands: CatInsertOneCommand[]) {}
}
