import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { BaseEntityFindQueryFixtures } from '../query/BaseEntityFindQueryFixtures';
import { BaseEntitySetCommandFixtures } from './BaseEntitySetCommandFixtures';

export class BaseEntityUpdateCommandFixtures {
  public static get any(): BaseEntityUpdateCommand {
    return { findQuery: BaseEntityFindQueryFixtures.any, setCommand: BaseEntitySetCommandFixtures.any };
  }
}
