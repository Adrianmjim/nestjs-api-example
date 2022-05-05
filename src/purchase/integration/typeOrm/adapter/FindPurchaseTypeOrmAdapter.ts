import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/FindTypeOrmAdapter';
import { Purchase } from '../../../domain/model/Purchase';
import { PurchaseFindQuery } from '../../../domain/query/PurchaseFindQuery';
import { PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter } from '../converter/PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter';
import { PurchaseTypeOrmToPurchaseConverter } from '../converter/PurchaseTypeOrmToPurchaseConverter';
import { PurchaseTypeOrm } from '../model/PurchaseTypeOrm';

@Injectable()
export class FindPurchaseTypeOrmAdapter extends FindTypeOrmAdapter<Purchase, PurchaseTypeOrm, PurchaseFindQuery> {
  public constructor(
    @InjectRepository(PurchaseTypeOrm) repository: Repository<PurchaseTypeOrm>,
    @Inject(PurchaseTypeOrmToPurchaseConverter)
    purchaseTypeOrmToPurchaseConverter: Converter<PurchaseTypeOrm, Purchase>,
    @Inject(PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter)
    purchaseFindQueryToPurchaseFindQueryTypeOrmConverter: Converter<PurchaseFindQuery, FindConditions<PurchaseTypeOrm>>,
  ) {
    super(repository, purchaseTypeOrmToPurchaseConverter, purchaseFindQueryToPurchaseFindQueryTypeOrmConverter);
  }
}
