import { BaseEntityInsertOneCommand } from '@nestjs-api-example/core-common/command';

export class CatInsertOneCommand implements BaseEntityInsertOneCommand {
  public readonly bornDate!: Date;
  public readonly color!: string;
  public readonly name!: string;

  public constructor(args: Required<CatInsertOneCommand>) {
    Object.assign(this, args);
  }
}
