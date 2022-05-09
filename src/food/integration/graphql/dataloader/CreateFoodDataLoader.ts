import { QueryBus } from '@nestjs/cqrs';
import DataLoader from 'dataloader';
import { Food } from '../../../domain/model/Food';
import { FoodFindQuery } from '../../../domain/query/FoodFindQuery';

export function createFoodDataLoader(queryBus: QueryBus): DataLoader<string, Food> {
  return new DataLoader<string, Food>(async (foodIds: readonly string[]) => {
    const foods: Food[] = await queryBus.execute(new FoodFindQuery(foodIds as string[]));

    const foodsMap: Map<string, Food> = new Map<string, Food>(foods.map((food: Food) => [food.id, food]));

    const sortFoods: Food[] = foodIds.map((foodId: string) => foodsMap.get(foodId) as Food);

    return sortFoods;
  });
}
