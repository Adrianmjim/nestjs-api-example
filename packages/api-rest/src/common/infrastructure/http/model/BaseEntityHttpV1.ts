import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class BaseEntityHttpV1 {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty()
  version!: number;
}
