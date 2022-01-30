import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { Cat } from '../../../domain/model/Cat';

@Injectable()
export class CatDeleteCommandToCatDeleteQueryTypeOrmConverter implements Converter<CatDeleteCommand, DeepPartial<Cat>> {
  public convert(input: CatDeleteCommand): DeepPartial<Cat> {
    const catDeleteQueryTypeOrm: DeepPartial<Cat> = {
      id: input.id,
    };

    return catDeleteQueryTypeOrm;
  }
}
