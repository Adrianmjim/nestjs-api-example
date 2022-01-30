import { Inject, Injectable } from '@nestjs/common';
import { InsertAdapter } from '../../../common/domain/service/InsertAdapter';
import { InsertOneManager } from '../../../common/domain/service/InsertOneManager';
import { InsertCatTypeOrmAdapter } from '../../integration/typeOrm/adapter/InsertCatTypeOrmAdapter';
import { CatInsertCommand } from '../command/CatInsertCommand';
import { Cat } from '../model/Cat';

@Injectable()
export class InsertCatManager extends InsertOneManager<Cat, CatInsertCommand> {
  public constructor(@Inject(InsertCatTypeOrmAdapter) insertCatTypeOrmAdapter: InsertAdapter<Cat, CatInsertCommand>) {
    super(insertCatTypeOrmAdapter);
  }
}
