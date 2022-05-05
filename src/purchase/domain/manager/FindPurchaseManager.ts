import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '../../../common/domain/service/FindAdapter';
import { FindManager } from '../../../common/domain/service/FindManager';
import { FindPurchaseTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindPurchaseTypeOrmAdapter';
import { Purchase } from '../model/Purchase';
import { PurchaseFindQuery } from '../query/PurchaseFindQuery';

@Injectable()
export class FindPurchaseManager extends FindManager<Purchase, PurchaseFindQuery> {
  public constructor(
    @Inject(FindPurchaseTypeOrmAdapter) findPurchaseTypeOrmAdapter: FindAdapter<Purchase, PurchaseFindQuery>,
  ) {
    super(findPurchaseTypeOrmAdapter);
  }
}
