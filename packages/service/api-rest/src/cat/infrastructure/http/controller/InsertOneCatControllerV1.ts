import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatInsertOneCommand } from '@nestjs-api-example/core-cat/command';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { CatHttpV1 } from '../model/CatHttpV1';
import { InsertOneCatHttpV1 } from '../model/InsertOneCatHttpV1';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class InsertOneCatControllerV1 {
  public constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: 'Post Cat',
    summary: 'Post cat',
  })
  @ApiCreatedResponse({ description: 'Returns the cat created', type: CatHttpV1 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  public async insertOne(@Body() body: InsertOneCatHttpV1): Promise<Cat> {
    const catInsertOneCommand: CatInsertOneCommand = new CatInsertOneCommand({
      bornDate: body.bornDate,
      color: body.color,
      name: body.name,
    });

    const cat: Cat = await this.commandBus.execute(catInsertOneCommand);

    return cat;
  }
}
