import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatFixtures } from '../model/CatFixtures';

export class CatInsertCommandFixtures {
  public static get any(): CatInsertCommand {
    return new CatInsertCommand(
      CatFixtures.any.age,
      CatFixtures.any.breed,
      CatFixtures.any.name,
      CatFixtures.any.ownerId,
      CatFixtures.any.favouriteFoodId,
    );
  }
}
