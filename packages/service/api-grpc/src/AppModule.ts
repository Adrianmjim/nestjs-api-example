import { Module } from '@nestjs/common';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';

import { AppController } from './AppController';
import { CatModule } from './cat/infrastructure/injection/CatModule';
import { grpcOptions } from './grpcConfig';

@Module({
  controllers: [AppController],
  imports: [CatModule, GrpcReflectionModule.register(grpcOptions)],
})
export class AppModule {}
