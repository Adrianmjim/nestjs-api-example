import { Field } from '@nestjs/graphql';
import { Max } from 'class-validator';

export class UpdateCat {
  @Max(9)
  age!: number;

  @Field()
  breed!: string;

  @Field()
  name!: string;
}
