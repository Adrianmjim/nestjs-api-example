import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatFindQueryFixtures } from '../query/CatFindQueryFixtures';
import { CatSetCommandFixtures } from './CatSetCommandFixtures';

export class CatUpdateCommandFixtures {
  public static get any(): CatUpdateCommand {
    return new CatUpdateCommand(CatFindQueryFixtures.withId, CatSetCommandFixtures.withName);
  }
}
