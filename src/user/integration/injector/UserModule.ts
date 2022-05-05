import { Module, Provider } from '@nestjs/common';
import { CqrsModule, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Converter } from '../../../common/domain/service/Converter';
import { Manager } from '../../../common/domain/service/Manager';
import { UserFindQueryHandler } from '../../application/handler/UserFindQueryHandler';
import { UserInsertCommandHandler } from '../../application/handler/UserInsertCommandHandler';
import { FindUserManager } from '../../domain/manager/FindUserManager';
import { InsertUserManager } from '../../domain/manager/InsertUserManager';
import { UserFindQueryToUserFindQueryTypeOrmConverter } from '../converter/UserFindQueryToUserFindQueryTypeOrmConverter';
import { UserInsertCommandToUserInsertQueryTypeOrmConverter } from '../converter/UserInsertCommandToUserInsertQueryTypeOrmConverter';
import { UserTypeOrmToUserConverter } from '../converter/UserTypeOrmToUserConverter';
import { UserResolver } from '../graphql/resolver/UserResolver';
import { FindUserTypeOrmAdapter } from '../typeOrm/adpater/FindUserTypeOrmAdapter';
import { InsertUserTypeOrmAdapter } from '../typeOrm/adpater/InsertUserTypeOrmAdapter';
import { UserTypeOrm } from '../typeOrm/model/UserTypeOrm';

const adapters: Provider<unknown>[] = [FindUserTypeOrmAdapter, InsertUserTypeOrmAdapter];

const converters: Provider<Converter>[] = [
  UserTypeOrmToUserConverter,
  UserFindQueryToUserFindQueryTypeOrmConverter,
  UserInsertCommandToUserInsertQueryTypeOrmConverter,
];

const commandHandlers: Provider<ICommandHandler>[] = [UserInsertCommandHandler];

const managers: Provider<Manager>[] = [FindUserManager, InsertUserManager];

const queryHandlers: Provider<IQueryHandler>[] = [UserFindQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), CqrsModule],
  providers: [...adapters, ...converters, ...commandHandlers, ...managers, ...queryHandlers, UserResolver],
})
export class UserModule {}
