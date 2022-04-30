import { NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInsertCommand } from '../../../domain/command/UserInsertCommand';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { InsertUser } from '../model/InsertUser';

@Resolver('User')
export class UserResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('user')
  public async findById(@Args('id') id: string): Promise<User> {
    const user: User = await this.queryBus.execute(new UserFindQuery(id, undefined));

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

  @Mutation()
  public async insertUser(@Args('insertUser') insertUser: InsertUser): Promise<User> {
    return this.commandBus.execute(
      new UserInsertCommand(insertUser.age, insertUser.email, insertUser.name, insertUser.surname),
    );
  }
}
