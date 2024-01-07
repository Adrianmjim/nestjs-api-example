import { CommonConstants } from '@nestjs-api-example/core-entity/model';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginateFindGraphQlInput {
  @IsOptional()
  @IsInt()
  @Min(CommonConstants.MIN_PAGINATION_ITEMS)
  @Max(CommonConstants.MAX_PAGINATION_ITEMS)
  limit: number = CommonConstants.DEFAULT_PAGINATION_ITEMS;

  @IsOptional()
  @IsInt()
  @Min(CommonConstants.MIN_PAGE)
  page: number = CommonConstants.MIN_PAGE;
}
