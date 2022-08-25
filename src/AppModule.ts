import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import {
  DateTimeResolver,
  EmailAddressResolver,
  PositiveIntResolver,
  UUIDResolver,
  VoidResolver,
} from 'graphql-scalars';
import { ConfigModule } from './config/infrastructure/injection/ConfigModule';
import { MikroOrmConfig } from './config/infrastructure/mikroOrm/MikroOrmConfig';

function graphQlFactory(queryBus: QueryBus): ApolloDriverConfig {
  return {
    context: () => ({}),
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

function mikroOrmFactory(mikroOrmConfig: MikroOrmConfig): MikroOrmModuleOptions {
  return {
    autoLoadEntities: true,
    dbName: mikroOrmConfig.database,
    forceUndefined: true,
    host: mikroOrmConfig.host,
    migrations: {
      path: 'dist/common/infrastructure/mikroOrm/migrations',
      pathTs: 'src/common/infrastructure/mikroOrm/migrations',
    },
    password: mikroOrmConfig.password,
    port: mikroOrmConfig.port,
    type: 'postgresql',
    user: mikroOrmConfig.user,
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
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [MikroOrmConfig],
      useFactory: mikroOrmFactory,
    }),
  ],
})
export class AppModule implements OnModuleInit {
  public constructor(private readonly mikroOrm: MikroORM) {}

  public async onModuleInit() {
    await this.mikroOrm.getMigrator().up();
  }
}
