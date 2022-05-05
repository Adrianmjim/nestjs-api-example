import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { PurchaseFindQuery } from '../../../domain/query/PurchaseFindQuery';
import { PurchaseTypeOrm } from '../model/PurchaseTypeOrm';

@Injectable()
export class PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter
  implements Converter<PurchaseFindQuery, FindConditions<PurchaseTypeOrm>>
{
  public convert(input: PurchaseFindQuery): FindConditions<PurchaseTypeOrm> {
    const purchaseFindQueryTypeOrm: FindConditions<PurchaseTypeOrm> = {};

    if (input.id !== undefined) {
      purchaseFindQueryTypeOrm.id = input.id;
    }

    if (input.userId !== undefined) {
      purchaseFindQueryTypeOrm.user = {
        id: input.userId,
      };
    }

    return purchaseFindQueryTypeOrm;
  }
}
