import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdapter } from '../../../common/domain/service/UpdateAdapter';
import { UpdateManager } from '../../../common/domain/service/UpdateManager';
import { UpdateCatTypeOrmAdapter } from '../../integration/typeOrm/adapter/UpdateCatTypeOrmAdapter';
import { CatUpdateCommand } from '../command/CatUpdateCommand';

@Injectable()
export class UpdateCatManager extends UpdateManager<CatUpdateCommand> {
  public constructor(@Inject(UpdateCatTypeOrmAdapter) updateCatTypeOrmAdapter: UpdateAdapter<CatUpdateCommand>) {
    super(updateCatTypeOrmAdapter);
  }
}
