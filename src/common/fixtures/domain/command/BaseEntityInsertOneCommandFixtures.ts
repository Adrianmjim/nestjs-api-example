import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityInsertOneCommandFixtures {
  public static get any(): BaseEntityInsertOneCommand {
    return { createdById: BaseEntityFixtures.any.createdById };
  }
}
