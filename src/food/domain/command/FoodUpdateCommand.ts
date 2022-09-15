import { BaseEntityUpdateCommand } from '../../../common/domain/command/BaseEntityUpdateCommand';
import { FoodFindQuery } from '../query/FoodFindQuery';
import { FoodSetCommand } from './FoodSetCommand';

export class FoodUpdateCommand implements BaseEntityUpdateCommand {
  public constructor(public readonly findQuery: FoodFindQuery, public readonly setCommand: FoodSetCommand) {}
}
