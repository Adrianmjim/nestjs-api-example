import { BaseEntitySortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';

export interface BaseEntityFindQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
