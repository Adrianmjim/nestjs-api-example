export interface UpdateAdapter<TCommand> {
  update(command: TCommand): Promise<void>;
}
