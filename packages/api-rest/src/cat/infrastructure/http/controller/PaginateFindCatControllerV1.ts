import { Pagination, Cat } from '@nestjs-api-example/core/models';
import { CatFindQuery, CatPaginateFindQuery } from '@nestjs-api-example/core/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiOkPaginationResponse } from '../../../../common/infrastructure/http/decorator/ApiOkPaginationResponse';
import { CatHttpV1 } from '../model/CatHttpV1';
import { PaginateFindCatHttpV1 } from '../model/PaginateFindCatHttpV1';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class PaginateFindCatControllerV1 {
  public constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    description: 'Get cats',
    summary: 'Get Cats',
  })
  @ApiOkPaginationResponse({ description: 'Returns a paginated list of roots', type: CatHttpV1 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  public async paginateFind(@Query() query: PaginateFindCatHttpV1): Promise<Pagination<Cat>> {
    const catFindQuery: CatFindQuery = new CatFindQuery({});

    const catPaginateFindQuery: CatPaginateFindQuery = new CatPaginateFindQuery(catFindQuery, {
      limit: query.limit,
      page: query.page,
    });

    const paginationCat: Pagination<Cat> = await this.queryBus.execute(catPaginateFindQuery);

    return paginationCat;
  }
}
