import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { FindQueryHandler } from '../../../common/application/handler/FindQueryHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { FindPurchaseManager } from '../../domain/manager/FindPurchaseManager';
import { Purchase } from '../../domain/model/Purchase';
import { PurchaseFindQuery } from '../../domain/query/PurchaseFindQuery';

@QueryHandler(PurchaseFindQuery)
export class PurchaseFindQueryHandler extends FindQueryHandler<PurchaseFindQuery, Purchase> {
  public constructor(@Inject(FindPurchaseManager) findPurchaseManager: Manager<PurchaseFindQuery, Purchase[]>) {
    super(findPurchaseManager);
  }
}
