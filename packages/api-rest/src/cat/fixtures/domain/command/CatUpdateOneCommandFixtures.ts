import { CatUpdateOneCommand } from '@nestjs-api-example/core/commands';

import { CatSetCommandFixtures } from './CatSetCommandFixtures';
import { CatFindQueryFixtures } from '../query/CatFindQueryFixtures';

export class CatUpdateOneCommandFixtures {
  public static get any(): CatUpdateOneCommand {
    const catUpdateOneCommand: CatUpdateOneCommand = new CatUpdateOneCommand(
      CatFindQueryFixtures.withIds,
      CatSetCommandFixtures.any,
    );

    return catUpdateOneCommand;
  }
}
