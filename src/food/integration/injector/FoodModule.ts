import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { Manager } from '../../../common/domain/service/Manager';
import { FoodFindQueryHandler } from '../../application/handler/FoodFindQueryHandler';
import { FoodInsertCommandHandler } from '../../application/handler/FoodInsertCommandHandler';
import { FindFoodManager } from '../../domain/manager/FindFoodManager';
import { InsertFoodManager } from '../../domain/manager/InsertFoodManager';
import { FoodResolver } from '../graphql/resolver/FoodResolver';
import { FindFoodTypeOrmAdapter } from '../typeOrm/adapter/FindFoodTypeOrmAdapter';
import { InsertFoodTypeOrmAdapter } from '../typeOrm/adapter/InsertFoodTypeOrmAdapter';
import { FoodFindQueryToFoodFindQueryTypeOrmConverter } from '../typeOrm/converter/FoodFindQueryToFoodFindQueryTypeOrmConverter';
import { FoodInsertCommandToFoodInsertQueryTypeOrmConverter } from '../typeOrm/converter/FoodInsertCommandToFoodInsertQueryTypeOrmConverter';
import { FoodTypeOrmToFoodConverter } from '../typeOrm/converter/FoodTypeOrmToFoodConverter';
import { FoodTypeOrm } from '../typeOrm/model/FoodTypeOrm';

const adapters: Provider<unknown>[] = [FindFoodTypeOrmAdapter, InsertFoodTypeOrmAdapter];

const commandHandlers: Provider<ICommandHandler>[] = [FoodInsertCommandHandler];

const converters: Provider<Converter>[] = [
  FoodTypeOrmToFoodConverter,
  FoodInsertCommandToFoodInsertQueryTypeOrmConverter,
  FoodFindQueryToFoodFindQueryTypeOrmConverter,
];

const managers: Provider<Manager>[] = [FindFoodManager, InsertFoodManager];

const queryHandlers: Provider<IQueryHandler>[] = [FoodFindQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([FoodTypeOrm]), CqrsModule],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers, FoodResolver],
})
export class FoodModule {}
