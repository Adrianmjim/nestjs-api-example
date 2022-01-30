import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Manager } from '../../domain/service/Manager';

@Injectable()
export class UpdateCommandHandler<TModel, TCommand extends ICommand> implements ICommandHandler<TCommand> {
  public constructor(private readonly updateManager: Manager<TCommand, TModel>) {}

  public async execute(command: TCommand): Promise<TModel> {
    return this.updateManager.manage(command);
  }
}
