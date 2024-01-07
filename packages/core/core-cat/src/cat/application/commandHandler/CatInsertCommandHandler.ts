import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertCommandHandler } from '@nestjs-api-example/core-common/command-handler';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { CatInsertCommand } from '../../domain/command/CatInsertCommand';
import { InsertCatManager } from '../../domain/manager/InsertCatManager';

@CommandHandler(CatInsertCommand)
export class CatInsertCommandHandler extends InsertCommandHandler<CatInsertCommand, Cat> {
  public constructor(
    @Inject(InsertCatManager)
    insertCatManager: ManagerAsync<CatInsertCommand, Cat[]>,
  ) {
    super(insertCatManager);
  }
}
