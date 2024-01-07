import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CatFindOneQuery } from '@nestjs-api-example/core-cat/query';
import { EntityNotFoundException } from '@nestjs-api-example/core-common/exception';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { CatHttpV1 } from '../model/CatHttpV1';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class FindOneCatControllerV1 {
  public constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    description: 'Get cat by id',
    summary: 'Get Cat',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Returns the cat found', type: CatHttpV1 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Cat with id ${id} not found' })
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) catId: string): Promise<Cat> {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({ ids: [catId] });

    const cat: Cat | undefined = await this.queryBus.execute(catFindOneQuery);

    if (cat === undefined) {
      throw new EntityNotFoundException(`Cat with id ${catId} not found`);
    }

    return cat;
  }
}
