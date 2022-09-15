import { UserFindQuery } from './UserFindQuery';

export class UserFindOneQuery extends UserFindQuery {
  public constructor(ids: string[] | undefined, email: string | undefined) {
    super(ids, email);
  }
}
