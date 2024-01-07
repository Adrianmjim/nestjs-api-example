import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';
import { FindQueryHandler } from '@nestjs-api-example/core-common/query-handler';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindCatManager } from '../../domain/manager/FindCatManager';
import { CatFindQuery } from '../../domain/query/CatFindQuery';

@QueryHandler(CatFindQuery)
export class CatFindQueryHandler extends FindQueryHandler<CatFindQuery, Cat> {
  public constructor(
    @Inject(FindCatManager)
    findCatManager: ManagerAsync<CatFindQuery, Cat[]>,
  ) {
    super(findCatManager);
  }
}
