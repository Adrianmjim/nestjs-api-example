import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateCommandHandler } from '../../../common/application/handler/UpdateCommandHandler';
import { Manager } from '../../../common/domain/service/Manager';
import { CatUpdateCommand } from '../../domain/command/CatUpdateCommand';
import { Cat } from '../../domain/model/Cat';
import { UpdateCatManager } from '../../domain/service/UpdateCatManager';

@CommandHandler(CatUpdateCommand)
export class CatUpdateCommandHandler extends UpdateCommandHandler<Cat, CatUpdateCommand> {
  public constructor(
    @Inject(UpdateCatManager)
    updateCatManager: Manager<CatUpdateCommand, Cat>,
  ) {
    super(updateCatManager);
  }
}
