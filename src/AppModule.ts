import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeDefs, resolvers } from 'graphql-scalars';
import { CatModule } from './cat/integration/injection/CatModule';
import { CatTypeOrm } from './cat/integration/typeOrm/model/CatTypeOrm';
import { ConfigModule } from './config/integration/injector/ConfigModule';
import { TypeOrmConfig } from './config/integration/typeOrm/service/TypeOrmConfig';

function typeOrmFactory(typeOrmConfig: TypeOrmConfig): TypeOrmModuleOptions {
  return {
    database: typeOrmConfig.database,
    entities: [CatTypeOrm],
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
      debug: true,
      driver: ApolloDriver,
      schema: makeExecutableSchema({
        resolvers: [resolvers],
        typeDefs: [...typeDefs],
      }),
      typePaths: ['./**/*.graphql'],
    }),
    CatModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [TypeOrmConfig],
      useFactory: typeOrmFactory,
    }),
  ],
})
export class AppModule {}
