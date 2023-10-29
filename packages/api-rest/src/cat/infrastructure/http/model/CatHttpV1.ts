import { ApiProperty } from '@nestjs/swagger';

import { BaseEntityHttpV1 } from '../../../../common/infrastructure/http/model/BaseEntityHttpV1';

export class CatHttpV1 extends BaseEntityHttpV1 {
  @ApiProperty()
  bornDate!: Date;

  @ApiProperty()
  color!: string;

  @ApiProperty()
  name!: string;
}
