import { Inject, Injectable } from '@nestjs/common';
import { FindOneAdapter } from '@nestjs-api-example/core-common/adapter';
import { FindOneManager } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindOneCatMikroOrmAdapter';
import { CatFindOneQuery } from '../query/CatFindOneQuery';

@Injectable()
export class FindOneCatManager extends FindOneManager<CatFindOneQuery, Cat> {
  public constructor(
    @Inject(FindOneCatMikroOrmAdapter)
    findOneCatMikroOrmAdapter: FindOneAdapter<CatFindOneQuery, Cat>,
  ) {
    super(findOneCatMikroOrmAdapter);
  }
}
