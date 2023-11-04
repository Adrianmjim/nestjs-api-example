import { ICommand } from '@nestjs/cqrs';

export class UserSetCommand implements ICommand {
  public constructor(
    public readonly age: number | undefined,
    public readonly email: string | undefined,
    public readonly name: string | undefined,
    public readonly surname: string | undefined,
  ) {}
}
