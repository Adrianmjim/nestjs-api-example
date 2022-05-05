import { ICommand } from '@nestjs/cqrs';

export class CatInsertCommand implements ICommand {
  public constructor(
    public readonly age: number,
    public readonly breed: string,
    public readonly favouriteFoodId: string,
    public readonly name: string,
    public readonly ownerId: string,
  ) {}
}
