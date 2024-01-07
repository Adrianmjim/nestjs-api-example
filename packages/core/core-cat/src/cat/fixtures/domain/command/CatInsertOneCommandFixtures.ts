import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';

export class CatInsertOneCommandFixtures {
  public static get any(): CatInsertOneCommand {
    const catInsertOneCommand: CatInsertOneCommand = new CatInsertOneCommand({
      bornDate: CatFixtures.any.bornDate,
      color: CatFixtures.any.color,
      name: CatFixtures.any.name,
    });

    return catInsertOneCommand;
  }
}
