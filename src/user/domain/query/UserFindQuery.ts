import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export class UserFindQuery implements BaseEntityFindQuery {
  public constructor(public readonly ids: string[] | undefined, public readonly email: string | undefined) {}
}
