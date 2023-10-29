import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsOptional } from 'class-validator';

export class UpdateOneCatHttpV1 {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  bornDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
