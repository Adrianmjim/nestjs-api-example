import { BaseEntityFixtures, BaseEntitySortKeyAndOrderTypeFixtures } from '@nestjs-api-example/core-entity/fixture';

import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';

export class BaseEntityFindQueryFixtures {
  public static get any(): BaseEntityFindQuery {
    const baseEntityFindQuery: BaseEntityFindQuery = {
      ids: undefined,
      sortKeyAndOrderTypes: undefined,
    };

    return baseEntityFindQuery;
  }

  public static get withIds(): BaseEntityFindQuery {
    const baseEntityFindQuery: BaseEntityFindQuery = {
      ids: [BaseEntityFixtures.any.id],
      sortKeyAndOrderTypes: undefined,
    };

    return baseEntityFindQuery;
  }

  public static get withSortKeyAndOrderTypes(): BaseEntityFindQuery {
    const baseEntityFindOneQuery: BaseEntityFindQuery = {
      ids: undefined,
      sortKeyAndOrderTypes: [BaseEntitySortKeyAndOrderTypeFixtures.any],
    };

    return baseEntityFindOneQuery;
  }
}
