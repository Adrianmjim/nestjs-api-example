import { Inject, Injectable } from '@nestjs/common';
import { InsertAdapter } from '@nestjs-api-example/core-common/adapter';
import { InsertManager } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { InsertCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertCatMikroOrmAdapter';
import { CatInsertCommand } from '../command/CatInsertCommand';

@Injectable()
export class InsertCatManager extends InsertManager<CatInsertCommand, Cat> {
  public constructor(
    @Inject(InsertCatMikroOrmAdapter)
    insertCatMikroOrmAdapter: InsertAdapter<CatInsertCommand, Cat>,
  ) {
    super(insertCatMikroOrmAdapter);
  }
}
