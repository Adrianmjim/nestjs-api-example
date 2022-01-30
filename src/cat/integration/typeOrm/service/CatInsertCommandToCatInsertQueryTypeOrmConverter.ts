import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatTypeOrm } from '../model/CatTypeOrm';

@Injectable()
export class CatInsertCommandToCatInsertQueryTypeOrmConverter
  implements Converter<CatInsertCommand, DeepPartial<CatTypeOrm>>
{
  public convert(input: CatInsertCommand): DeepPartial<CatTypeOrm> {
    const output: DeepPartial<CatTypeOrm> = {
      age: input.age,
      breed: input.breed,
      name: input.name,
    };

    return output;
  }
}
