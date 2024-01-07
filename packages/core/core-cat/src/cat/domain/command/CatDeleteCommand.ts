import { BaseEntityDeleteCommand } from '@nestjs-api-example/core-common/command';

export class CatDeleteCommand implements BaseEntityDeleteCommand {
  public readonly id: string | undefined = undefined;

  public constructor(args: Partial<CatDeleteCommand>) {
    Object.assign(this, args);
  }
}
