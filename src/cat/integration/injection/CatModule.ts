import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { Manager } from '../../../common/domain/service/Manager';
import { CatDeleteCommandHandler } from '../../application/handler/CatDeleteCommandHandler';
import { CatFindQueryHandler } from '../../application/handler/CatFindQueryHandler';
import { CatInsertCommandHandler } from '../../application/handler/CatInsertCommandHandlert';
import { CatUpdateCommandHandler } from '../../application/handler/CatUpdateCommandHandler';
import { DeleteCatManager } from '../../domain/service/DeleteCatManager';
import { FindCatManager } from '../../domain/service/FindCatManager';
import { InsertCatManager } from '../../domain/service/InsertCatManager';
import { UpdateCatManager } from '../../domain/service/UpdateCatManager';
import { CatResolver } from '../graphql/resolver/CatResolver';
import { CatController } from '../http/controller/CatController';
import { DeleteCatTypeOrmAdapter } from '../typeOrm/adapter/DeleteCatTypeOrmAdapter';
import { FindCatTypeOrmAdapter } from '../typeOrm/adapter/FindCatTypeOrmAdapter';
import { InsertCatTypeOrmAdapter } from '../typeOrm/adapter/InsertCatTypeOrmAdapter';
import { UpdateCatTypeOrmAdapter } from '../typeOrm/adapter/UpdateCatTypeOrmAdapter';
import { CatTypeOrm } from '../typeOrm/model/CatTypeOrm';
import { CatDeleteCommandToCatDeleteQueryTypeOrmConverter } from '../typeOrm/service/CatDeleteCommandToCatDeleteQueryTypeOrmConverter';
import { CatFindQueryToCatFindQueryTypeOrmConverter } from '../typeOrm/service/CatFindQueryToCatFindQueryTypeOrmConverter';
import { CatInsertCommandToCatInsertQueryTypeOrmConverter } from '../typeOrm/service/CatInsertCommandToCatInsertQueryTypeOrmConverter';
import { CatSetCommandToCatSetQueryTypeOrmConverter } from '../typeOrm/service/CatSetCommandToCatSetQueryTypeOrmConverter';
import { CatTypeOrmToCatConverter } from '../typeOrm/service/CatTypeOrmToCatConverter';
import { CatUpdateCommandToCatFindQueryTypeOrmConverter } from '../typeOrm/service/CatUpdateCommandToCatFindQueryTypeOrmConverter';
import { CatUpdateCommandToCatSetQueryTypeOrmConverter } from '../typeOrm/service/CatUpdateCommandToCatSetQueryTypeOrmConverter';

const adapters: Provider<unknown>[] = [
  DeleteCatTypeOrmAdapter,
  FindCatTypeOrmAdapter,
  InsertCatTypeOrmAdapter,
  UpdateCatTypeOrmAdapter,
];

const commandHandlers: Provider<ICommandHandler>[] = [
  CatDeleteCommandHandler,
  CatInsertCommandHandler,
  CatUpdateCommandHandler,
];

const converters: Provider<Converter>[] = [
  CatDeleteCommandToCatDeleteQueryTypeOrmConverter,
  CatFindQueryToCatFindQueryTypeOrmConverter,
  CatInsertCommandToCatInsertQueryTypeOrmConverter,
  CatSetCommandToCatSetQueryTypeOrmConverter,
  CatTypeOrmToCatConverter,
  CatUpdateCommandToCatFindQueryTypeOrmConverter,
  CatUpdateCommandToCatSetQueryTypeOrmConverter,
];

const managers: Provider<Manager>[] = [DeleteCatManager, FindCatManager, InsertCatManager, UpdateCatManager];

const queryHandlers: Provider<IQueryHandler>[] = [CatFindQueryHandler];

@Module({
  controllers: [CatController],
  imports: [TypeOrmModule.forFeature([CatTypeOrm]), CqrsModule],
  providers: [...adapters, ...commandHandlers, ...converters, ...managers, ...queryHandlers, CatResolver],
})
export class CatModule {}
