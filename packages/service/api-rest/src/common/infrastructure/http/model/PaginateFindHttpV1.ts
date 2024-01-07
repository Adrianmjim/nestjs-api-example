import { ApiPropertyOptional } from '@nestjs/swagger';
import { CommonConstants } from '@nestjs-api-example/core-entity/model';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

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
