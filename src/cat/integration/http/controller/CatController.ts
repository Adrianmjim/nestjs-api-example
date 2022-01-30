import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EntityNotFoundException } from '../../../../common/domain/exception/EntityNotFoundException';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatResponse } from '../model/CatResponse';
import { InsertCatRequest } from '../model/InsertCatRequest';
import { UpdateCatRequest } from '../model/UpdateCatRequest';

@ApiTags('Cats')
@Controller('cats')
export class CatController {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: 'Create cats',
    summary: 'Create Cat',
  })
  @ApiCreatedResponse({ description: 'Returns the cat created', type: CatResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  public async create(@Body() body: InsertCatRequest): Promise<Cat> {
    const catInsertCommand: CatInsertCommand = new CatInsertCommand(body.age, body.breed, body.name);

    const cat: Cat = await this.commandBus.execute(catInsertCommand);

    return cat;
  }

  @ApiOperation({ description: 'Find cats', summary: 'Find Cats' })
  @ApiQuery({ name: 'age', required: false })
  @ApiQuery({ name: 'breed', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ description: 'Returns a list of cats', type: [CatResponse] })
  @Get()
  public async find(
    @Param('age', ParseIntPipe) age?: number,
    @Param('breed') breed?: string,
    @Param('name') name?: string,
  ): Promise<Cat[]> {
    const catFindQuery: CatFindQuery = new CatFindQuery(age, breed, undefined, name);
    const cats: Cat[] = await this.queryBus.execute(catFindQuery);

    return cats;
  }

  @ApiOperation({
    description: 'Find cat by id',
    summary: 'Find Cat By Id',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Returns a cat', type: CatResponse })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Cat> {
    const catFindQuery: CatFindQuery = new CatFindQuery(undefined, undefined, id, undefined);
    const [cat]: Cat[] = await this.queryBus.execute(catFindQuery);

    if (cat === undefined) {
      throw new EntityNotFoundException(`Cat with id ${id} not found`);
    } else {
      return cat;
    }
  }

  @ApiOperation({ description: 'Update cat', summary: 'Update Cat' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Empty response' })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(@Param('id') id: string, @Body() body: UpdateCatRequest): Promise<void> {
    const catFindQuery: CatFindQuery = new CatFindQuery(undefined, undefined, id, undefined);
    const catSetCommand: CatSetCommand = new CatSetCommand(body.age, body.breed, body.name);
    const catUpdateCommand: CatUpdateCommand = new CatUpdateCommand(catFindQuery, catSetCommand);

    return this.commandBus.execute(catUpdateCommand);
  }

  @ApiOperation({ description: 'Delete cat', summary: 'Delete Cat' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Empty response' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    const catDeleteCommand: CatDeleteCommand = new CatDeleteCommand(id);

    return this.commandBus.execute(catDeleteCommand);
  }
}