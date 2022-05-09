import { IQuery } from '@nestjs/cqrs';

export class CatFindQuery implements IQuery {
  public constructor(
    public readonly age: number | undefined,
    public readonly breed: string | undefined,
    public readonly favouriteFoodId: string | undefined,
    public readonly id: string | undefined,
    public readonly name: string | undefined,
    public readonly ownerId: string | undefined,
  ) {}
}
