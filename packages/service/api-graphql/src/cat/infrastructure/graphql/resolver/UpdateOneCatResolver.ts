import { CommandBus } from '@nestjs/cqrs';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CatSetCommand, CatUpdateOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatFindQuery } from '@nestjs-api-example/core-cat/query';

import { UpdateOneCatGraphQlInput } from '../model/UpdateOneCatGraphQlInput';

@Resolver('Cat')
export class UpdateOneCatResolver {
  public constructor(private readonly commandBus: CommandBus) {}

  @Mutation('updateOneCat')
  public async updateOne(
    @Args('id') catId: string,
    @Args('updateOneCatInput') insertOneCatGraphQlInput: UpdateOneCatGraphQlInput,
  ): Promise<void> {
    const catUpdateOneCommand: CatUpdateOneCommand = new CatUpdateOneCommand(
      new CatFindQuery({
        ids: [catId],
      }),
      new CatSetCommand({
        bornDate: insertOneCatGraphQlInput.bornDate,
        color: insertOneCatGraphQlInput.color,
        name: insertOneCatGraphQlInput.name,
      }),
    );

    await this.commandBus.execute(catUpdateOneCommand);
  }
}
