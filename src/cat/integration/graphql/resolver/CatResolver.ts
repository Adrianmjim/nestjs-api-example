import { applyDecorators, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from '../../../../user/domain/model/User';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { InsertCat } from '../model/InsertCat';

@Resolver('Cat')
export class CatResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('cat')
  public async findById(@Args('id') id: string): Promise<Cat> {
    const [cat]: Cat[] = await this.queryBus.execute(
      new CatFindQuery(undefined, undefined, id, undefined, undefined, undefined),
    );

    if (cat !== undefined) {
      return cat;
    } else {
      throw new NotFoundException();
    }
  }

  @Query('cats')
  public async find(
    @Args('age') age: number | undefined,
    @Args('breed') breed: string | undefined,
    @Args('favouriteFoodId') favouriteFoodId: string | undefined,
    @Args('name') name: string | undefined,
    @Args('ownerId') ownerId: string | undefined,
  ): Promise<Cat[]> {
    return this.queryBus.execute(new CatFindQuery(age, breed, favouriteFoodId, undefined, name, ownerId));
  }

  @Mutation('insertCat')
  public async insert(@Args('insertCatInput') insertCat: InsertCat): Promise<Cat> {
    return this.commandBus.execute(
      new CatInsertCommand(
        insertCat.age,
        insertCat.breed,
        insertCat.favouriteFoodId,
        insertCat.name,
        insertCat.ownerId,
      ),
    );
  }

  @applyDecorators(Resolver('User'), ResolveField('cats'))
  public async resolveUserCats(@Parent() user: User): Promise<Cat[]> {
    return this.queryBus.execute(new CatFindQuery(undefined, undefined, undefined, undefined, undefined, user.id));
  }
}
