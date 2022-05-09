import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DateTimeResolver,
  EmailAddressResolver,
  PositiveIntResolver,
  UUIDResolver,
  VoidResolver,
} from 'graphql-scalars';
import { CatModule } from './cat/integration/injection/CatModule';
import { CatTypeOrm } from './cat/integration/typeOrm/model/CatTypeOrm';
import { ConfigModule } from './config/integration/injector/ConfigModule';
import { TypeOrmConfig } from './config/integration/typeOrm/service/TypeOrmConfig';
import { createFoodDataLoader } from './food/integration/graphql/dataloader/CreateFoodDataLoader';
import { FoodModule } from './food/integration/injector/FoodModule';
import { FoodTypeOrm } from './food/integration/typeOrm/model/FoodTypeOrm';
import { PurchaseModule } from './purchase/integration/injector/PurchaseModule';
import { PurchaseTypeOrm } from './purchase/integration/typeOrm/model/PurchaseTypeOrm';
import { createUserDataLoader } from './user/integration/graphql/dataloader/CreateUserDataLoader';
import { UserModule } from './user/integration/injector/UserModule';
import { UserTypeOrm } from './user/integration/typeOrm/model/UserTypeOrm';

function typeOrmFactory(typeOrmConfig: TypeOrmConfig): TypeOrmModuleOptions {
  return {
    database: typeOrmConfig.database,
    entities: [CatTypeOrm, FoodTypeOrm, PurchaseTypeOrm, UserTypeOrm],
    host: typeOrmConfig.host,
    password: typeOrmConfig.password,
    port: typeOrmConfig.port,
    type: 'postgres',
    username: typeOrmConfig.user,
  };
}

function graphQlFactory(queryBus: QueryBus): ApolloDriverConfig {
  return {
    context: () => ({
      foodDataLoader: createFoodDataLoader(queryBus),
      userDataLoader: createUserDataLoader(queryBus),
    }),
    resolvers: {
      DateTime: DateTimeResolver,
      EmailAddress: EmailAddressResolver,
      PositiveInt: PositiveIntResolver,
      UUID: UUIDResolver,
      Void: VoidResolver,
    },
    typePaths: ['./**/*.graphql'],
  };
}

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [CqrsModule],
      inject: [QueryBus],
      useFactory: graphQlFactory,
    }),
    CatModule,
    FoodModule,
    PurchaseModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [TypeOrmConfig],
      useFactory: typeOrmFactory,
    }),
  ],
})
export class AppModule {}
