import { CatSetCommand, CatUpdateOneCommand } from '@nestjs-api-example/core/commands';
import { CatFindQuery } from '@nestjs-api-example/core/queries';
import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateOneCatHttpV1 } from '../model/UpdateOneCatHttpV1';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class UpdateOneCatControllerV1 {
  public constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: 'Patch cat by id',
    summary: 'Patch Cat',
  })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Empty response' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'This course can not be updated' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateOne(@Param('id', ParseUUIDPipe) catId: string, @Body() body: UpdateOneCatHttpV1): Promise<void> {
    const catUpdateOneCommand: CatUpdateOneCommand = new CatUpdateOneCommand(
      new CatFindQuery({
        ids: [catId],
      }),
      new CatSetCommand({
        bornDate: body.bornDate,
        color: body.color,
        name: body.name,
      }),
    );

    await this.commandBus.execute(catUpdateOneCommand);
  }
}
