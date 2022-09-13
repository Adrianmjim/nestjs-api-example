import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';

export class BaseEntityFindOneQueryFixtures {
  public static get any(): BaseEntityFindOneQuery {
    return { ids: undefined };
  }
}
