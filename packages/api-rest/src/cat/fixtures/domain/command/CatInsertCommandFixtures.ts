import { CatInsertCommand } from '@nestjs-api-example/core/commands';

import { CatInsertOneCommandFixtures } from './CatInsertOneCommandFixtures';

export class CatInsertCommandFixtures {
  public static get any(): CatInsertCommand {
    const catInsertCommand: CatInsertCommand = new CatInsertCommand([CatInsertOneCommandFixtures.any]);

    return catInsertCommand;
  }
}
