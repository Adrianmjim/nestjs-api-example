import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertOneCommandHandler } from '../../../common/application/handler/InsertOneCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { CatInsertCommand } from '../../domain/command/CatInsertCommand';
import { Cat } from '../../domain/model/Cat';
import { InsertCatManager } from '../../domain/service/InsertCatManager';

@CommandHandler(CatInsertCommand)
export class CatInsertCommandHandler extends InsertOneCommandHandler<CatInsertCommand, Cat> {
  public constructor(@Inject(InsertCatManager) insertCatManager: Manager<CatInsertCommand, Cat>) {
    super(insertCatManager);
  }
}
