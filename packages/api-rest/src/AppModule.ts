import { Module } from '@nestjs/common';
import { AppConfigModule } from '@nestjs-api-example/core/modules';

import { AppController } from './AppController';
import { CatModule } from './cat/infrastructure/injection/CatModule';

@Module({
  controllers: [AppController],
  imports: [AppConfigModule, CatModule],
})
export class AppModule {}
