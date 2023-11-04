import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class InsertCatHttpV1 {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  breed!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  favouriteFoodId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  ownerId!: string;
}
