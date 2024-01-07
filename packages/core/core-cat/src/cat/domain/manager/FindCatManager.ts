import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '@nestjs-api-example/core-common/adapter';
import { FindManager } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindCatMikroOrmAdapter';
import { CatFindQuery } from '../query/CatFindQuery';

@Injectable()
export class FindCatManager extends FindManager<CatFindQuery, Cat> {
  public constructor(
    @Inject(FindCatMikroOrmAdapter)
    findCatMikroOrmAdapter: FindAdapter<CatFindQuery, Cat>,
  ) {
    super(findCatMikroOrmAdapter);
  }
}
