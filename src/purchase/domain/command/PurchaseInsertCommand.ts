import { ICommand } from '@nestjs/cqrs';

export class PurchaseInsertCommand implements ICommand {
  public constructor(public readonly foodId: string, public readonly prize: number, public readonly userId: string) {}
}
