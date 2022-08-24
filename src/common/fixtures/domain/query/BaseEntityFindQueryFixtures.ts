import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityFindQueryFixtures {
  public static get any(): BaseEntityFindQuery {
    return { ids: undefined };
  }

  public static get withIds(): BaseEntityFindQuery {
    return { ids: [BaseEntityFixtures.any.id] };
  }
}
