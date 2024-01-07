import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Resolver } from '@nestjs/graphql';
import { CatDeleteCommand } from '@nestjs-api-example/core-cat/command';
import { CatFindOneQuery } from '@nestjs-api-example/core-cat/query';
import { EntityNotFoundException } from '@nestjs-api-example/core-common/exception';
import { Cat } from '@nestjs-api-example/core-entity/model';

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
