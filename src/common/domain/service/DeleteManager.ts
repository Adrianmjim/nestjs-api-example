import { Injectable } from '@nestjs/common';
import { DeleteAdapter } from './DeleteAdapter';
import { Manager } from './Manager';

@Injectable()
export class DeleteManager<TCommand> implements Manager<TCommand, void> {
  public constructor(private readonly deleteAdapter: DeleteAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.deleteAdapter.delete(command);
  }
}
