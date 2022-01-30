import { ApiProperty } from '@nestjs/swagger';

export class CatResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  age!: number;

  @ApiProperty()
  breed!: string;
}
