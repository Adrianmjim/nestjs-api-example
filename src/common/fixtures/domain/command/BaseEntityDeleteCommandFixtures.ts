import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityDeleteCommandFixtures {
  public static get any(): BaseEntityDeleteCommand {
    return { id: BaseEntityFixtures.any.id };
  }
}
