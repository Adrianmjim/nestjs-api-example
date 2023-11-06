import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CatDeleteCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CatFindOneQuery } from '@nestjs-api-example/core/queries';

import { EntityNotFoundException } from '../../../../common/domain/exception/EntityNotFoundException';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class DeleteOneCatControllerV1 {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    description: 'Delete cat by id',
    summary: 'Delete Cat',
  })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Empty response' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Cat with id ${id} not found' })
  @ApiConflictResponse({ description: 'This course can not be deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteOne(@Param('id', ParseUUIDPipe) catId: string): Promise<void> {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({
      ids: [catId],
    });

    const cat: Cat | undefined = await this.queryBus.execute(catFindOneQuery);

    if (cat === undefined) {
      throw new EntityNotFoundException(`Cat with id ${catId} not found`);
    }

    const catDeleteCommand: CatDeleteCommand = new CatDeleteCommand({
      id: catId,
    });

    await this.commandBus.execute(catDeleteCommand);
  }
}
