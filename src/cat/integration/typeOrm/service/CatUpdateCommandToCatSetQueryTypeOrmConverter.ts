import { Inject, Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatSetCommandToCatSetQueryTypeOrmConverter } from './CatSetCommandToCatSetQueryTypeOrmConverter';

@Injectable()
export class CatUpdateCommandToCatSetQueryTypeOrmConverter
  implements Converter<CatUpdateCommand, QueryDeepPartialEntity<CatTypeOrm>>
{
  public constructor(
    @Inject(CatSetCommandToCatSetQueryTypeOrmConverter)
    private readonly catSetCommandToCatSetQueryTypeOrmConverter: Converter<
      CatSetCommand,
      QueryDeepPartialEntity<CatTypeOrm>
    >,
  ) {}

  public convert(input: CatUpdateCommand): QueryDeepPartialEntity<CatTypeOrm> {
    const catSetQueryTypeOrm: QueryDeepPartialEntity<CatTypeOrm> =
      this.catSetCommandToCatSetQueryTypeOrmConverter.convert(input.setCommand);

    return catSetQueryTypeOrm;
  }
}
