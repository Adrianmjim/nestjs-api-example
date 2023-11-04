import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatFixtures } from '../model/CatFixtures';

export class CatDeleteCommandFixtures {
  public static get any(): CatDeleteCommand {
    return new CatDeleteCommand(CatFixtures.any.id);
  }
}
