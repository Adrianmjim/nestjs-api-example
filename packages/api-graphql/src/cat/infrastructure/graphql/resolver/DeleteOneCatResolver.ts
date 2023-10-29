import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Resolver } from '@nestjs/graphql';
import { CatDeleteCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CatFindOneQuery } from '@nestjs-api-example/core/queries';

import { EntityNotFoundException } from '../../../../common/domain/exception/EntityNotFoundException';

@Resolver('Cat')
export class DeleteOneCatResolver {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async deleteOne(@Args('id') catId: string): Promise<void> {
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
