import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertOneCommandHandler } from '@nestjs-api-example/core-common/command-handler';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { CatInsertOneCommand } from '../../domain/command/CatInsertOneCommand';
import { InsertOneCatManager } from '../../domain/manager/InsertOneCatManager';

@CommandHandler(CatInsertOneCommand)
export class CatInsertOneCommandHandler extends InsertOneCommandHandler<CatInsertOneCommand, Cat> {
  public constructor(
    @Inject(InsertOneCatManager)
    insertOneCatManager: ManagerAsync<CatInsertOneCommand, Cat>,
  ) {
    super(insertOneCatManager);
  }
}
