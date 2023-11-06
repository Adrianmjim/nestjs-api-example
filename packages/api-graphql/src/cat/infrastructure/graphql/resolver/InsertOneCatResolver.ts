import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CatInsertOneCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';

import { InsertOneCatGraphQlInput } from '../model/InsertOneCatGraphQlInput';

@Resolver('Cat')
export class InsertOneCatResolver {
  public constructor(private readonly commandBus: CommandBus) {}

  @Mutation('insertOneCat')
  public async insertOne(@Args('insertOneCatInput') insertOneCatGraphQlInput: InsertOneCatGraphQlInput): Promise<Cat> {
    const catInsertOneCommand: CatInsertOneCommand = new CatInsertOneCommand({
      bornDate: insertOneCatGraphQlInput.bornDate,
      color: insertOneCatGraphQlInput.color,
      name: insertOneCatGraphQlInput.name,
    });

    const cat: Cat = await this.commandBus.execute(catInsertOneCommand);

    return cat;
  }
}
