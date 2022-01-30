import { Injectable } from '@nestjs/common';
import { Manager } from './Manager';
import { UpdateAdapter } from './UpdateAdapter';

@Injectable()
export class UpdateManager<TCommand> implements Manager<TCommand, void> {
  public constructor(private readonly updateAdapter: UpdateAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateAdapter.update(command);
  }
}
