import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteCommandHandler } from '../../../common/application/handler/DeleteCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { CatDeleteCommand } from '../../domain/command/CatDeleteCommand';
import { Cat } from '../../domain/model/Cat';
import { DeleteCatManager } from '../../domain/service/DeleteCatManager';

@CommandHandler(CatDeleteCommand)
export class CatDeleteCommandHandler extends DeleteCommandHandler<Cat, CatDeleteCommand> {
  public constructor(@Inject(DeleteCatManager) deleteCatManager: Manager<CatDeleteCommand, Cat>) {
    super(deleteCatManager);
  }
}
