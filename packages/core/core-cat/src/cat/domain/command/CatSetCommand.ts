import { BaseEntitySetCommand } from '@nestjs-api-example/core-common/command';
import { PartialAndRequired } from '@nestjs-api-example/core-entity/model';

export class CatSetCommand implements BaseEntitySetCommand {
  public readonly bornDate: Date | undefined = undefined;
  public readonly color: string | undefined = undefined;
  public readonly name: string | undefined = undefined;

  public constructor(args: PartialAndRequired<CatSetCommand, BaseEntitySetCommand>) {
    Object.assign(this, args);
  }
}
