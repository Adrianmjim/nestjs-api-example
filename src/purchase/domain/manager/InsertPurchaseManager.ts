import { Inject, Injectable } from '@nestjs/common';
import { InsertAdapter } from '../../../common/domain/service/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { InsertPurchaseTypeOrmAdapter } from '../../integration/typeOrm/adapter/InsertPurchaseTypeOrmAdapter';
import { PurchaseInsertCommand } from '../command/PurchaseInsertCommand';
import { Purchase } from '../model/Purchase';

@Injectable()
export class InsertPurchaseManager extends InsertOneManager<Purchase, PurchaseInsertCommand> {
  public constructor(
    @Inject(InsertPurchaseTypeOrmAdapter) insertPurchaseTypeOrmAdapter: InsertAdapter<Purchase, PurchaseInsertCommand>,
  ) {
    super(insertPurchaseTypeOrmAdapter);
  }
}
