import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertOneCommandFixtures } from './CatInsertOneCommandFixtures';

export class CatInsertCommandFixtures {
  public static get any(): CatInsertCommand {
    const catInsertCommand: CatInsertCommand = new CatInsertCommand([CatInsertOneCommandFixtures.any]);

    return catInsertCommand;
  }
}
