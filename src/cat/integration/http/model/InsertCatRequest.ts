import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertCatRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  age!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  breed!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
