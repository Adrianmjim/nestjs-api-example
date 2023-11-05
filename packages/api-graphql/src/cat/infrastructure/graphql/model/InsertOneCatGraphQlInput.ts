import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDate, IsString } from 'class-validator';

@InputType()
export class InsertOneCatGraphQlInput {
  @IsNotEmpty()
  @IsDate()
  bornDate!: Date;

  @IsNotEmpty()
  @IsString()
  color!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
