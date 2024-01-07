import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteCommandHandler } from '@nestjs-api-example/core-common/command-handler';
import { ManagerAsync } from '@nestjs-api-example/core-common/manager';

import { CatDeleteCommand } from '../../domain/command/CatDeleteCommand';
import { DeleteCatManager } from '../../domain/manager/DeleteCatManager';

@CommandHandler(CatDeleteCommand)
export class CatDeleteCommandHandler extends DeleteCommandHandler<CatDeleteCommand> {
  public constructor(
    @Inject(DeleteCatManager)
    deleteCatManager: ManagerAsync<CatDeleteCommand, void>,
  ) {
    super(deleteCatManager);
  }
}
