import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class InsertOneCatHttpV1 {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  bornDate!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
