import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommandFixtures } from './CatUpdateOneCommandFixtures';

export class CatUpdateCommandFixtures {
  public static get any(): CatUpdateCommand {
    const catUpdateCommand: CatUpdateCommand = new CatUpdateCommand([CatUpdateOneCommandFixtures.any]);

    return catUpdateCommand;
  }
}
