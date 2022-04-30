import { NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { InsertCat } from '../model/InsertCat';
import { UpdateCat } from '../model/UpdateCat';

@Resolver('Cat')
export class CatResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('cat')
  public async findById(@Args('id') id: string): Promise<Cat> {
    const [cat]: Cat[] = await this.queryBus.execute(new CatFindQuery(undefined, undefined, id, undefined));

    if (cat !== undefined) {
      return cat;
    } else {
      throw new NotFoundException();
    }
  }

  @Query('cats')
  public async find(): Promise<Cat[]> {
    return this.queryBus.execute(new CatFindQuery(undefined, undefined, undefined, undefined));
  }

  @Mutation()
  public async insertCat(@Args('insertCatInput') insertCat: InsertCat): Promise<Cat> {
    return this.commandBus.execute(new CatInsertCommand(insertCat.age, insertCat.breed, insertCat.name));
  }

  @Mutation()
  public async updateCat(@Args('id') id: string, @Args('updateCatInput') updateCat: UpdateCat): Promise<void> {
    console.log(id);
    console.log(updateCat.name);
    console.log(updateCat);
  }
}
