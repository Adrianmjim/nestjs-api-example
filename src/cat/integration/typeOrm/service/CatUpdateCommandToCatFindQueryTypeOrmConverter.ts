import { Inject, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatFindQueryToCatFindQueryTypeOrmConverter } from './CatFindQueryToCatFindQueryTypeOrmConverter';

@Injectable()
export class CatUpdateCommandToCatFindQueryTypeOrmConverter
  implements Converter<CatUpdateCommand, FindConditions<CatTypeOrm>>
{
  public constructor(
    @Inject(CatFindQueryToCatFindQueryTypeOrmConverter)
    private readonly catFindQueryToCatFindQueryTypeOrmConverter: Converter<CatFindQuery, FindConditions<CatTypeOrm>>,
  ) {}

  public convert(input: CatUpdateCommand): FindConditions<CatTypeOrm> {
    const catFindQueryTypeOrm: FindConditions<CatTypeOrm> = this.catFindQueryToCatFindQueryTypeOrmConverter.convert(
      input.findQuery,
    );

    return catFindQueryTypeOrm;
  }
}
