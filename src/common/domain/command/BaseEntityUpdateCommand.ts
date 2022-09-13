import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';
import { BaseEntitySetCommand } from './BaseEntitySetCommand';

export interface BaseEntityUpdateCommand {
  findQuery: BaseEntityFindQuery;
  setCommand: BaseEntitySetCommand;
}
