import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatTypeOrm } from '../model/CatTypeOrm';

@Injectable()
export class CatSetCommandToCatSetQueryTypeOrmConverter implements Converter<CatSetCommand, DeepPartial<CatTypeOrm>> {
  public convert(input: CatSetCommand): DeepPartial<CatTypeOrm> {
    const catSetQueryTypeOrm: DeepPartial<CatTypeOrm> = {};

    if (input.age !== undefined) {
      catSetQueryTypeOrm.age = input.age;
    }

    if (input.breed !== undefined) {
      catSetQueryTypeOrm.breed = input.breed;
    }

    if (input.name !== undefined) {
      catSetQueryTypeOrm.name = input.name;
    }

    return catSetQueryTypeOrm;
  }
}
