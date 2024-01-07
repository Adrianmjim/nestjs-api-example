import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdapter } from '@nestjs-api-example/core-common/adapter';
import { UpdateManager } from '@nestjs-api-example/core-common/manager';

import { UpdateCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/UpdateCatMikroOrmAdapter';
import { CatUpdateCommand } from '../command/CatUpdateCommand';

@Injectable()
export class UpdateCatManager extends UpdateManager<CatUpdateCommand> {
  public constructor(
    @Inject(UpdateCatMikroOrmAdapter)
    updateCatMikroOrmAdapter: UpdateAdapter<CatUpdateCommand>,
  ) {
    super(updateCatMikroOrmAdapter);
  }
}
