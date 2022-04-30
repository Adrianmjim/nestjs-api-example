import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Max } from 'class-validator';

export class UpdateCat {
  @Max(9)
  age!: number;

  @Field()
  breed!: string;

  @Field()
  name!: string;
}
