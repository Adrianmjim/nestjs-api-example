import { BaseEntityUpdateCommand } from '@nestjs-api-example/core-common/command';

import { CatUpdateOneCommand } from './CatUpdateOneCommand';

export class CatUpdateCommand implements BaseEntityUpdateCommand {
  public constructor(public readonly commands: CatUpdateOneCommand[]) {}
}
