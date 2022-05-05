import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InsertOneCommandHandler } from '../../../common/application/handler/InsertOneCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { PurchaseInsertCommand } from '../../domain/command/PurchaseInsertCommand';
import { InsertPurchaseManager } from '../../domain/manager/InsertPurchaseManager';
import { Purchase } from '../../domain/model/Purchase';

@CommandHandler(PurchaseInsertCommand)
export class PurchaseInsertCommandHandler extends InsertOneCommandHandler<PurchaseInsertCommand, Purchase> {
  public constructor(@Inject(InsertPurchaseManager) insertPurchaseManager: Manager<PurchaseInsertCommand, Purchase>) {
    super(insertPurchaseManager);
  }
}
