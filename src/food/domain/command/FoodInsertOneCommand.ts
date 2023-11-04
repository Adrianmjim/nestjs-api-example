import { BaseEntityInsertOneCommand } from '../../../common/domain/command/BaseEntityInsertOneCommand';

export class FoodInsertOneCommand implements BaseEntityInsertOneCommand {
  public constructor(public readonly amount: number, public readonly name: string, public readonly prize: number) {}
}
