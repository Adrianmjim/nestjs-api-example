import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatHttpV1 {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  age!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  breed!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name!: string;
}
