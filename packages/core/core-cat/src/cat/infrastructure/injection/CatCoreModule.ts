import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Converter } from '@nestjs-api-example/core-common/converter';
import { Manager } from '@nestjs-api-example/core-common/manager';
import { CommonCoreModule } from '@nestjs-api-example/core-common/module';
import { DatabaseConfig } from '@nestjs-api-example/core-config/model';
import { DatabaseConfigModule } from '@nestjs-api-example/core-config/module';
import { getMikroOrmModuleOptions } from '@nestjs-api-example/core-config/util';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatDeleteCommandHandler } from '../../application/commandHandler/CatDeleteCommandHandler';
import { CatInsertCommandHandler } from '../../application/commandHandler/CatInsertCommandHandler';
import { CatInsertOneCommandHandler } from '../../application/commandHandler/CatInsertOneCommandHandler';
import { CatUpdateCommandHandler } from '../../application/commandHandler/CatUpdateCommandHandler';
import { CatUpdateOneCommandHandler } from '../../application/commandHandler/CatUpdateOneCommandHandler';
import { CatFindOneQueryHandler } from '../../application/queryHandler/CatFindOneQueryHandler';
import { CatFindQueryHandler } from '../../application/queryHandler/CatFindQueryHandler';
import { CatPaginateFindQueryHandler } from '../../application/queryHandler/CatPaginateFindQueryHandler';
import { DeleteCatManager } from '../../domain/manager/DeleteCatManager';
import { FindCatManager } from '../../domain/manager/FindCatManager';
import { FindOneCatManager } from '../../domain/manager/FindOneCatManager';
import { InsertCatManager } from '../../domain/manager/InsertCatManager';
import { InsertOneCatManager } from '../../domain/manager/InsertOneCatManager';
import { PaginateFindCatManager } from '../../domain/manager/PaginateFindCatManager';
import { UpdateCatManager } from '../../domain/manager/UpdateCatManager';
import { UpdateOneCatManager } from '../../domain/manager/UpdateOneCatManager';
import { DeleteCatMikroOrmAdapter } from '../mikroOrm/adapter/DeleteCatMikroOrmAdapter';
import { FindCatMikroOrmAdapter } from '../mikroOrm/adapter/FindCatMikroOrmAdapter';
import { FindOneCatMikroOrmAdapter } from '../mikroOrm/adapter/FindOneCatMikroOrmAdapter';
import { InsertCatMikroOrmAdapter } from '../mikroOrm/adapter/InsertCatMikroOrmAdapter';
import { InsertOneCatMikroOrmAdapter } from '../mikroOrm/adapter/InsertOneCatMikroOrmAdapter';
import { PaginateFindCatMikroOrmAdapter } from '../mikroOrm/adapter/PaginateFindCatMikroOrmAdapter';
import { UpdateCatMikroOrmAdapter } from '../mikroOrm/adapter/UpdateCatMikroOrmAdapter';
import { UpdateOneCatMikroOrmAdapter } from '../mikroOrm/adapter/UpdateOneCatMikroOrmAdapter';
import { CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync';
import { CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatInsertCommandToCatInsertQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatInsertCommandToCatInsertQueryMikroOrmConverterAsync';
import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../mikroOrm/converter/CatMikroOrmToCatConverterAsync';
import { CatMikroOrmToPaginationCatConverterAsync } from '../mikroOrm/converter/CatMikroOrmToPaginationCatConverterAsync';
import { CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatSetCommandToCatSetQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatSetCommandToCatSetQueryMikroOrmConverterAsync';
import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from '../mikroOrm/converter/CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';
import { CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter } from '../mikroOrm/converter/CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter';
import { CatUpdateCommandToCatFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatUpdateCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateCommandToCatSetQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatUpdateCommandToCatSetQueryMikroOrmConverterAsync';
import { CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync } from '../mikroOrm/converter/CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync';

const adapters: Provider<unknown>[] = [
  DeleteCatMikroOrmAdapter,
  FindCatMikroOrmAdapter,
  FindOneCatMikroOrmAdapter,
  InsertCatMikroOrmAdapter,
  InsertOneCatMikroOrmAdapter,
  PaginateFindCatMikroOrmAdapter,
  UpdateCatMikroOrmAdapter,
  UpdateOneCatMikroOrmAdapter,
];

const commandHandlers: Provider<ICommandHandler>[] = [
  CatDeleteCommandHandler,
  CatInsertCommandHandler,
  CatInsertOneCommandHandler,
  CatUpdateCommandHandler,
  CatUpdateOneCommandHandler,
];

const converters: Provider<Converter<unknown, unknown>>[] = [
  CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync,
  CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync,
  CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
  CatFindQueryToCatFindQueryMikroOrmConverterAsync,
  CatInsertCommandToCatInsertQueryMikroOrmConverterAsync,
  CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync,
  CatMikroOrmToCatConverterAsync,
  CatMikroOrmToPaginationCatConverterAsync,
  CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
  CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync,
  CatSetCommandToCatSetQueryMikroOrmConverterAsync,
  CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter,
  CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter,
  CatUpdateCommandToCatFindQueryMikroOrmConverterAsync,
  CatUpdateCommandToCatSetQueryMikroOrmConverterAsync,
  CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync,
  CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync,
];

const managers: Provider<Manager<unknown, unknown>>[] = [
  DeleteCatManager,
  FindCatManager,
  FindOneCatManager,
  InsertCatManager,
  InsertOneCatManager,
  PaginateFindCatManager,
  UpdateCatManager,
  UpdateOneCatManager,
];

const queryHandlers: Provider<IQueryHandler>[] = [
  CatFindOneQueryHandler,
  CatFindQueryHandler,
  CatPaginateFindQueryHandler,
];

@Module({
  imports: [
    CommonCoreModule,
    MikroOrmModule.forFeature([CatMikroOrm]),
    MikroOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfig],
      useFactory: getMikroOrmModuleOptions,
    }),
  ],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers],
})
export class CatCoreModule {}
