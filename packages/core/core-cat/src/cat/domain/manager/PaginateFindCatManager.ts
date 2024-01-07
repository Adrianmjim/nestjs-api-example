import { Inject, Injectable } from '@nestjs/common';
import { PaginateFindAdapter } from '@nestjs-api-example/core-common/adapter';
import { PaginateFindManager } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { PaginateFindCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/PaginateFindCatMikroOrmAdapter';
import { CatPaginateFindQuery } from '../query/CatPaginateFindQuery';

@Injectable()
export class PaginateFindCatManager extends PaginateFindManager<CatPaginateFindQuery, Cat> {
  public constructor(
    @Inject(PaginateFindCatMikroOrmAdapter)
    paginateFindCatMikroOrmAdapter: PaginateFindAdapter<CatPaginateFindQuery, Cat>,
  ) {
    super(paginateFindCatMikroOrmAdapter);
  }
}
