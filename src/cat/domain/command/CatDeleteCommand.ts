import { ICommand } from '@nestjs/cqrs';

export class CatDeleteCommand implements ICommand {
  public constructor(public readonly id: string) {}
}
