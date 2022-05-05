import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EmailAddressResolver, PositiveIntResolver, UUIDResolver, VoidResolver } from 'graphql-scalars';
import { CatModule } from './cat/integration/injection/CatModule';
import { CatTypeOrm } from './cat/integration/typeOrm/model/CatTypeOrm';
import { ConfigModule } from './config/integration/injector/ConfigModule';
import { TypeOrmConfig } from './config/integration/typeOrm/service/TypeOrmConfig';
import { FoodModule } from './food/integration/injector/FoodModule';
import { FoodTypeOrm } from './food/integration/typeOrm/model/FoodTypeOrm';
import { PurchaseModule } from './purchase/integration/injector/PurchaseModule';
import { PurchaseTypeOrm } from './purchase/integration/typeOrm/model/PurchaseTypeOrm';
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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: {
        EmailAddress: EmailAddressResolver,
        PositiveInt: PositiveIntResolver,
        UUID: UUIDResolver,
        Void: VoidResolver,
      },
      typePaths: ['./**/*.graphql'],
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
