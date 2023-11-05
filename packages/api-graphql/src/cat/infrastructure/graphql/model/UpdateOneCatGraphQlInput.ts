import { InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateOneCatGraphQlInput {
  @IsOptional()
  @IsDate()
  bornDate!: Date;

  @IsOptional()
  @IsString()
  color!: string;

  @IsOptional()
  @IsString()
  name!: string;
}
