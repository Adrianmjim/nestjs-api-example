import { Inject, Injectable } from '@nestjs/common';
import { DeleteAdapter } from '../../../common/domain/service/DeleteAdapter';
import { DeleteManager } from '../../../common/domain/service/DeleteManager';
import { DeleteCatTypeOrmAdapter } from '../../integration/typeOrm/adapter/DeleteCatTypeOrmAdapter';
import { CatDeleteCommand } from '../command/CatDeleteCommand';

@Injectable()
export class DeleteCatManager extends DeleteManager<CatDeleteCommand> {
  public constructor(@Inject(DeleteCatTypeOrmAdapter) deleteCatTypeOrmAdapter: DeleteAdapter<CatDeleteCommand>) {
    super(deleteCatTypeOrmAdapter);
  }
}
