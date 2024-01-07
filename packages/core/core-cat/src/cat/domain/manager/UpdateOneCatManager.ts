import { Inject, Injectable } from '@nestjs/common';
import { UpdateOneAdapter } from '@nestjs-api-example/core-common/adapter';
import { UpdateOneManager } from '@nestjs-api-example/core-common/manager';

import { UpdateOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/UpdateOneCatMikroOrmAdapter';
import { CatUpdateOneCommand } from '../command/CatUpdateOneCommand';

@Injectable()
export class UpdateOneCatManager extends UpdateOneManager<CatUpdateOneCommand> {
  public constructor(
    @Inject(UpdateOneCatMikroOrmAdapter)
    updateOneCatMikroOrmAdapter: UpdateOneAdapter<CatUpdateOneCommand>,
  ) {
    super(updateOneCatMikroOrmAdapter);
  }
}
