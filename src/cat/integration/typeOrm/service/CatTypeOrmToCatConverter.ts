import { Injectable } from '@nestjs/common';
import { Converter } from '../../../../common/domain/service/Converter';
import { Cat } from '../../../domain/model/Cat';
import { CatTypeOrm } from '../model/CatTypeOrm';

@Injectable()
export class CatTypeOrmToCatConverter implements Converter<CatTypeOrm, Cat> {
  public convert(input: CatTypeOrm): Cat {
    const cat: Cat = {
      age: input.age,
      breed: input.breed,
      favouriteFoodId: input.favouriteFoodId,
      id: input.id,
      name: input.name,
      ownerId: input.ownerId,
    };

    return cat;
  }
}
