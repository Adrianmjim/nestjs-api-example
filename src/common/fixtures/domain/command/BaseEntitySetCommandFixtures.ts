import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntitySetCommandFixtures {
  public static get any(): BaseEntitySetCommand {
    return { updatedById: BaseEntityFixtures.withUpdatedAtAndUpdatedById.updatedById as string };
  }
}
