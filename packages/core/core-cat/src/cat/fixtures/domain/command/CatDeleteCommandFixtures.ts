import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';

export class CatDeleteCommandFixtures {
  public static get any(): CatDeleteCommand {
    const catDeleteCommand: CatDeleteCommand = new CatDeleteCommand({});

    return catDeleteCommand;
  }

  public static get withId(): CatDeleteCommand {
    const catDeleteCommand: CatDeleteCommand = new CatDeleteCommand({
      id: CatFixtures.any.id,
    });

    return catDeleteCommand;
  }
}
