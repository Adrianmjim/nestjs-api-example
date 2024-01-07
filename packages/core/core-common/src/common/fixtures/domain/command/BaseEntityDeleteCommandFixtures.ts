import { BaseEntityFixtures } from '@nestjs-api-example/core-entity/fixture';

import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';

export class BaseEntityDeleteCommandFixtures {
  public static get withId(): BaseEntityDeleteCommand {
    const baseEntityDeleteCommand: BaseEntityDeleteCommand = {
      id: BaseEntityFixtures.any.id,
    };

    return baseEntityDeleteCommand;
  }
}
