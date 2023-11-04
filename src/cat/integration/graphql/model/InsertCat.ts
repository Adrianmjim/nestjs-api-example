import { InputType } from '@nestjs/graphql';

@InputType()
export class InsertCat {
  age!: number;
  breed!: string;
  name!: string;
  ownerId!: string;
  favouriteFoodId!: string;
}
