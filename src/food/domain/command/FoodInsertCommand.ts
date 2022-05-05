import { ICommand } from '@nestjs/cqrs';

export class FoodInsertCommand implements ICommand {
  public constructor(public readonly amount: number, public readonly name: string, public readonly prize: number) {}
}
