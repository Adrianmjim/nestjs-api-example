import { IsDate, IsOptional, IsString } from 'class-validator';

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
