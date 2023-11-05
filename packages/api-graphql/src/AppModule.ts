import { AppConfigModule } from '@nestjs-api-example/core/modules';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DateTimeResolver, PositiveIntResolver, UUIDResolver, VoidResolver } from 'graphql-scalars';

import { AppController } from './AppController';
import { CatModule } from './cat/infrastructure/injection/CatModule';

@Module({
  controllers: [AppController],
  imports: [
    AppConfigModule,
    CatModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      resolvers: {
        DateTime: DateTimeResolver,
        PositiveInt: PositiveIntResolver,
        UUID: UUIDResolver,
        Void: VoidResolver,
      },
      typePaths: ['./../**/*.graphql'],
    }),
  ],
})
export class AppModule {}
