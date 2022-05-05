import { IQuery } from '@nestjs/cqrs';

export class UserFindQuery implements IQuery {
  public constructor(public readonly id: string | undefined, public readonly email: string | undefined) {}
}
