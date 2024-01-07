import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateOneCommandHandler } from '@nestjs-api-example/core-common/command-handler';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';

import { CatUpdateOneCommand } from '../../domain/command/CatUpdateOneCommand';
import { UpdateOneCatManager } from '../../domain/manager/UpdateOneCatManager';

@CommandHandler(CatUpdateOneCommand)
export class CatUpdateOneCommandHandler extends UpdateOneCommandHandler<CatUpdateOneCommand> {
  public constructor(
    @Inject(UpdateOneCatManager)
    updateOneCatManager: ManagerAsync<CatUpdateOneCommand, void>,
  ) {
    super(updateOneCatManager);
  }
}
