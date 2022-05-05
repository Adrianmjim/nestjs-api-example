import { Inject, Injectable } from '@nestjs/common';
import { FindAdapter } from '../../../common/domain/service/FindAdapter';
import { FindManager } from '../../../common/domain/service/FindManager';
import { FindCatTypeOrmAdapter } from '../../integration/typeOrm/adapter/FindCatTypeOrmAdapter';
import { Cat } from '../model/Cat';
import { CatFindQuery } from '../query/CatFindQuery';

@Injectable()
export class FindCatManager extends FindManager<Cat, CatFindQuery> {
  public constructor(@Inject(FindCatTypeOrmAdapter) findCatTypeOrmAdapter: FindAdapter<Cat, CatFindQuery>) {
    super(findCatTypeOrmAdapter);
  }
}
