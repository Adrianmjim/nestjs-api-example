import { Inject, Injectable } from '@nestjs/common';
import { InsertOneAdapter } from '@nestjs-api-example/core-common/adapter';
import { InsertOneManager } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { InsertOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertOneCatMikroOrmAdapter';
import { CatInsertOneCommand } from '../command/CatInsertOneCommand';

@Injectable()
export class InsertOneCatManager extends InsertOneManager<CatInsertOneCommand, Cat> {
  public constructor(
    @Inject(InsertOneCatMikroOrmAdapter)
    insertOneCatMikroOrmAdapter: InsertOneAdapter<CatInsertOneCommand, Cat>,
  ) {
    super(insertOneCatMikroOrmAdapter);
  }
}
