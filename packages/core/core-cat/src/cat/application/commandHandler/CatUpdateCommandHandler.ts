import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateCommandHandler } from '@nestjs-api-example/core-common/command-handler';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';

import { CatUpdateCommand } from '../../domain/command/CatUpdateCommand';
import { UpdateCatManager } from '../../domain/manager/UpdateCatManager';

@CommandHandler(CatUpdateCommand)
export class CatUpdateCommandHandler extends UpdateCommandHandler<CatUpdateCommand> {
  public constructor(
    @Inject(UpdateCatManager)
    updateCatManager: ManagerAsync<CatUpdateCommand, void>,
  ) {
    super(updateCatManager);
  }
}
