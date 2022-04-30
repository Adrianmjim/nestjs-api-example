import { ICommand } from '@nestjs/cqrs';

export class UserInsertCommand implements ICommand {
  public constructor(
    public readonly age: number,
    public readonly email: string,
    public readonly name: string,
    public readonly surname: string,
  ) {}
}
