import { CatDeleteCommand } from '@nestjs-api-example/core/commands';

import { CatFixtures } from '../model/CatFixtures';

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
