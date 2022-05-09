import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { PurchaseInsertCommand } from '../../../domain/command/PurchaseInsertCommand';
import { PurchaseTypeOrm } from '../model/PurchaseTypeOrm';

@Injectable()
export class PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter
  implements Converter<PurchaseInsertCommand, DeepPartial<PurchaseTypeOrm>>
{
  public convert(input: PurchaseInsertCommand): DeepPartial<PurchaseTypeOrm> {
    const purchaseInsertQueryTypeOrm: DeepPartial<PurchaseTypeOrm> = {
      date: new Date(),
      food: {
        id: input.foodId,
      },
      prize: input.prize,
      user: {
        id: input.userId,
      },
    };

    return purchaseInsertQueryTypeOrm;
  }
}
