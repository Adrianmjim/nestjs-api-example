import { applyDecorators, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Cat } from '../../../../cat/domain/model/Cat';
import { Purchase } from '../../../../purchase/domain/model/Purchase';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { InsertUser } from '../model/InsertUser';

@Resolver('User')
export class UserResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('user')
  public async findById(@Args('id') id: string): Promise<User> {
    const [user]: User[] = await this.queryBus.execute(new UserFindQuery([id], undefined));

    if (user !== undefined) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Query('users')
  public async find(): Promise<User[]> {
    return this.queryBus.execute(new UserFindQuery(undefined, undefined));
  }

  @Mutation('insertUser')
  public async insert(@Args('insertUser') insertUser: InsertUser): Promise<User> {
    return this.commandBus.execute(
      new UserInsertOneCommand(insertUser.age, insertUser.email, insertUser.name, insertUser.surname),
    );
  }

  @applyDecorators(Resolver('Cat'), ResolveField('owner'))
  public async resolveCatOwner(
    @Parent() cat: Cat,
    @Context('userDataLoader') userDataLoader: DataLoader<string, User>,
  ): Promise<User> {
    return userDataLoader.load(cat.ownerId);
  }

  @applyDecorators(Resolver('Purchase'), ResolveField('user'))
  public async resolvePurchaseUser(
    @Parent() purchase: Purchase,
    @Context('userDataLoader') userDataLoader: DataLoader<string, User>,
  ): Promise<User> {
    return userDataLoader.load(purchase.userId);
  }
}
