import { Inject, Injectable } from '@nestjs/common';
import { DeleteAdapter } from '@nestjs-api-example/core-common/adapter';
import { DeleteManager } from '@nestjs-api-example/core-common/manager';

import { DeleteCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/DeleteCatMikroOrmAdapter';
import { CatDeleteCommand } from '../command/CatDeleteCommand';

@Injectable()
export class DeleteCatManager extends DeleteManager<CatDeleteCommand> {
  public constructor(
    @Inject(DeleteCatMikroOrmAdapter)
    deleteCatMikroOrmAdapter: DeleteAdapter<CatDeleteCommand>,
  ) {
    super(deleteCatMikroOrmAdapter);
  }
}
