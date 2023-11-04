import { BaseEntityDeleteCommand } from '../../../common/domain/command/BaseEntityDeleteCommand';

export class FoodDeleteCommand implements BaseEntityDeleteCommand {
  public constructor(public readonly id: string) {}
}
