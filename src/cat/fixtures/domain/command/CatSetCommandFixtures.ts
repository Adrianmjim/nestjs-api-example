import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatFixtures } from '../model/CatFixtures';

export class CatSetCommandFixtures {
  public static get any(): CatSetCommand {
    return new CatSetCommand(CatFixtures.any.age, undefined, undefined);
  }

  public static get withAge(): CatSetCommand {
    return new CatSetCommand(CatFixtures.any.age, undefined, undefined);
  }

  public static get withBreed(): CatSetCommand {
    return new CatSetCommand(undefined, CatFixtures.any.breed, undefined);
  }

  public static get withName(): CatSetCommand {
    return new CatSetCommand(undefined, undefined, CatFixtures.any.name);
  }
}
