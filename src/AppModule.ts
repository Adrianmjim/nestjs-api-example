import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
    CatModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [TypeOrmConfig],
      useFactory: typeOrmFactory,
    }),
  ],
})
export class AppModule {}
