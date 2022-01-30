import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  age!: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  breed!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name!: string;
}
