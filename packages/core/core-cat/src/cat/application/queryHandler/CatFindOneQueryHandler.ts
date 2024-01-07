import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';
import { FindOneQueryHandler } from '@nestjs-api-example/core-common/query-handler';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindOneCatManager } from '../../domain/manager/FindOneCatManager';
import { CatFindOneQuery } from '../../domain/query/CatFindOneQuery';

@QueryHandler(CatFindOneQuery)
export class CatFindOneQueryHandler extends FindOneQueryHandler<CatFindOneQuery, Cat> {
  public constructor(
    @Inject(FindOneCatManager)
    findOneCatManager: ManagerAsync<CatFindOneQuery, Cat | undefined>,
  ) {
    super(findOneCatManager);
  }
}
