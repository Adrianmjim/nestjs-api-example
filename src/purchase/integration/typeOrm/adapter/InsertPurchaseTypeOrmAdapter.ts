import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { InsertTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/InsertTypeOrmAdapter';
import { PurchaseInsertCommand } from '../../../domain/command/PurchaseInsertCommand';
import { Purchase } from '../../../domain/model/Purchase';
import { PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter } from '../converter/PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter';
import { PurchaseTypeOrmToPurchaseConverter } from '../converter/PurchaseTypeOrmToPurchaseConverter';
import { PurchaseTypeOrm } from '../model/PurchaseTypeOrm';

@Injectable()
export class InsertPurchaseTypeOrmAdapter extends InsertTypeOrmAdapter<
  Purchase,
  PurchaseTypeOrm,
  PurchaseInsertCommand
> {
  public constructor(
    @InjectRepository(PurchaseTypeOrm) repository: Repository<PurchaseTypeOrm>,
    @Inject(PurchaseTypeOrmToPurchaseConverter)
    purchaseTypeOrmToPurchaseConverter: Converter<PurchaseTypeOrm, Purchase>,
    @Inject(PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter)
    purchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter: Converter<
      PurchaseInsertCommand,
      DeepPartial<PurchaseTypeOrm>
    >,
  ) {
    super(repository, purchaseTypeOrmToPurchaseConverter, purchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter);
  }
}
