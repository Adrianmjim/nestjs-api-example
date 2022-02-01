import { ApiProperty } from '@nestjs/swagger';

export class CatHttpV1 {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  age!: number;

  @ApiProperty()
  breed!: string;
}
