import { BaseEntitySetCommand } from '../../../common/domain/command/BaseEntitySetCommand';

export class FoodSetCommand implements BaseEntitySetCommand {
  public constructor(
    public readonly amount: number | undefined,
    public readonly name: string | undefined,
    public readonly prize: number | undefined,
  ) {}
}
