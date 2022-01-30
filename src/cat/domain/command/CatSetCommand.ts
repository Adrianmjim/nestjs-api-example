import { ICommand } from '@nestjs/cqrs';

export class CatSetCommand implements ICommand {
  public constructor(
    public readonly age: number | undefined,
    public readonly breed: string | undefined,
    public readonly name: string | undefined,
  ) {}
}
