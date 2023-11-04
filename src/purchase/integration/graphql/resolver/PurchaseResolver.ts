import { applyDecorators, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from '../../../../user/domain/model/User';
import { PurchaseInsertCommand } from '../../../domain/command/PurchaseInsertCommand';
import { Purchase } from '../../../domain/model/Purchase';
import { PurchaseFindQuery } from '../../../domain/query/PurchaseFindQuery';
import { InsertPurchase } from '../input/InsertPurchase';

@Resolver('Purchase')
export class PurchaseResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBud: CommandBus) {}

  @Query('purchase')
  public async findById(@Args('id') id: string): Promise<Purchase> {
    const [purchase]: Purchase[] = await this.queryBus.execute(new PurchaseFindQuery(id, undefined));

    if (purchase !== undefined) {
      return purchase;
    } else {
      throw new NotFoundException();
    }
  }

  @Query('purchases')
  public async find(@Args('userId') userId: string | undefined): Promise<Purchase[]> {
    return this.queryBus.execute(new PurchaseFindQuery(undefined, userId));
  }

  @Mutation('insertPurchase')
  public async insert(@Args('insertPurchase') insertPurchase: InsertPurchase): Promise<Purchase> {
    return this.commandBud.execute(
      new PurchaseInsertCommand(insertPurchase.foodId, insertPurchase.prize, insertPurchase.userId),
    );
  }

  @applyDecorators(Resolver('User'), ResolveField('purchases'))
  public async resolveUserPurchases(@Parent() user: User): Promise<Purchase[]> {
    return this.queryBus.execute(new PurchaseFindQuery(undefined, user.id));
  }
}
