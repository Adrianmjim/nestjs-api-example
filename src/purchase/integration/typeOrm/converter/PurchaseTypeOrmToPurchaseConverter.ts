import { Injectable } from '@nestjs/common';
import { Converter } from '../../../../common/domain/service/Converter';
import { Purchase } from '../../../domain/model/Purchase';
import { PurchaseTypeOrm } from '../model/PurchaseTypeOrm';

@Injectable()
export class PurchaseTypeOrmToPurchaseConverter implements Converter<PurchaseTypeOrm, Purchase> {
  public convert(input: PurchaseTypeOrm): Purchase {
    const purchase: Purchase = {
      date: input.date,
      foodId: input.foodId,
      id: input.id,
      prize: input.prize,
      userId: input.userId,
    };

    return purchase;
  }
}
