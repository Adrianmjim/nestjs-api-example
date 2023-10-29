import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { CommonConstants } from '../../../domain/model/CommonConstants';

export class PaginateFindHttpV1 {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(CommonConstants.MIN_PAGINATION_ITEMS)
  @Max(CommonConstants.MAX_PAGINATION_ITEMS)
  limit: number = CommonConstants.DEFAULT_PAGINATION_ITEMS;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(CommonConstants.MIN_PAGE)
  page: number = CommonConstants.MIN_PAGE;
}
