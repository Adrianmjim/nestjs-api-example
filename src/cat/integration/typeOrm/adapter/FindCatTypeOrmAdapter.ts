import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { FindTypeOrmAdapter } from '../../../../common/integration/typeOrm/adapter/FindTypeOrmAdapter';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatFindQueryToCatFindQueryTypeOrmConverter } from '../service/CatFindQueryToCatFindQueryTypeOrmConverter';
import { CatTypeOrmToCatConverter } from '../service/CatTypeOrmToCatConverter';

@Injectable()
export class FindCatTypeOrmAdapter extends FindTypeOrmAdapter<Cat, CatTypeOrm, CatFindQuery> {
  public constructor(
    @InjectRepository(CatTypeOrm) repository: Repository<CatTypeOrm>,
    @Inject(CatTypeOrmToCatConverter)
    catTypeOrmToCatConverter: Converter<CatTypeOrm, Cat>,
    @Inject(CatFindQueryToCatFindQueryTypeOrmConverter)
    catFindQueryToCatFindQueryTypeOrmConverter: Converter<CatFindQuery, FindConditions<CatTypeOrm>>,
  ) {
    super(repository, catTypeOrmToCatConverter, catFindQueryToCatFindQueryTypeOrmConverter);
  }
}
