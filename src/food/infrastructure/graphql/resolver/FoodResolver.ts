import { applyDecorators, NotFoundException, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Cat } from '../../../../cat/domain/model/Cat';
import { Purchase } from '../../../../purchase/domain/model/Purchase';
import { FoodInsertCommand } from '../../../domain/command/FoodInsertCommand';
import { Food } from '../../../domain/model/Food';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';
import { InsertFood } from '../input/InsertFood';

@Resolver('Food')
export class FoodResolver {
  public constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('food')
  public async findById(@Args('id') id: string): Promise<Food> {
    const [food]: Food[] = await this.queryBus.execute(new FoodFindQuery([id]));

    if (food !== undefined) {
      return food;
    } else {
      throw new NotFoundException();
    }
  }

  @Query('foods')
  public async find(): Promise<Food[]> {
    return this.queryBus.execute(new FoodFindQuery(undefined));
  }

  @Mutation('insertFood')
  public async insert(@Args('insertFood') insertFood: InsertFood): Promise<Food> {
    return this.commandBus.execute(new FoodInsertCommand(insertFood.amount, insertFood.name, insertFood.prize));
  }

  @applyDecorators(Resolver('Cat'), ResolveField('favouriteFood'))
  public async resolveCatFavouriteFood(
    @Parent() cat: Cat,
    @Context('foodDataLoader') foodDataLoader: DataLoader<string, Food>,
  ): Promise<Food> {
    return foodDataLoader.load(cat.favouriteFoodId);
  }

  @applyDecorators(Resolver('Purchase'), ResolveField('food'))
  public async resolvePurchaseFood(
    @Parent() purchase: Purchase,
    @Context('foodDataLoader') foodDataLoader: DataLoader<string, Food>,
  ): Promise<Food> {
    return foodDataLoader.load(purchase.foodId);
  }
}
