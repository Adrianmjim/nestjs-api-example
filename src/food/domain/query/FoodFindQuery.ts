import { IQuery } from '@nestjs/cqrs';

export class FoodFindQuery implements IQuery {
  public constructor(public readonly id: string | undefined) {}
}
