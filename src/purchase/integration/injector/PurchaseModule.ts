import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { Manager } from '../../../common/domain/service/Manager';
import { PurchaseFindQueryHandler } from '../../application/handler/PurchaseFindQueryHandler';
import { PurchaseInsertCommandHandler } from '../../application/handler/PurchaseInsertCommandHandler';
import { FindPurchaseManager } from '../../domain/manager/FindPurchaseManager';
import { InsertPurchaseManager } from '../../domain/manager/InsertPurchaseManager';
import { PurchaseResolver } from '../graphql/resolver/PurchaseResolver';
import { FindPurchaseTypeOrmAdapter } from '../typeOrm/adapter/FindPurchaseTypeOrmAdapter';
import { InsertPurchaseTypeOrmAdapter } from '../typeOrm/adapter/InsertPurchaseTypeOrmAdapter';
import { PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter } from '../typeOrm/converter/PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter';
import { PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter } from '../typeOrm/converter/PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter';
import { PurchaseTypeOrmToPurchaseConverter } from '../typeOrm/converter/PurchaseTypeOrmToPurchaseConverter';
import { PurchaseTypeOrm } from '../typeOrm/model/PurchaseTypeOrm';

const adapters: Provider<unknown>[] = [FindPurchaseTypeOrmAdapter, InsertPurchaseTypeOrmAdapter];

const commandHandlers: Provider<ICommandHandler>[] = [PurchaseInsertCommandHandler];

const converters: Provider<Converter>[] = [
  PurchaseTypeOrmToPurchaseConverter,
  PurchaseFindQueryToPurchaseFindQueryTypeOrmConverter,
  PurchaseInsertCommandToPurchaseInsertQueryTypeOrmConverter,
];

const managers: Provider<Manager>[] = [FindPurchaseManager, InsertPurchaseManager];

const queryHandlers: Provider<IQueryHandler>[] = [PurchaseFindQueryHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PurchaseTypeOrm])],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers, PurchaseResolver],
})
export class PurchaseModule {}
