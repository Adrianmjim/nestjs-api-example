import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { FindQueryHandler } from '../../../common/application/handler/FindQueryHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { Cat } from '../../domain/model/Cat';
import { CatFindQuery } from '../../domain/query/CatFindQuery';
import { FindCatManager } from '../../domain/service/FindCatManager';

@QueryHandler(CatFindQuery)
export class CatFindQueryHandler extends FindQueryHandler<CatFindQuery, Cat> {
  public constructor(@Inject(FindCatManager) findCatManager: Manager<CatFindQuery, Cat[]>) {
    super(findCatManager);
  }
}
