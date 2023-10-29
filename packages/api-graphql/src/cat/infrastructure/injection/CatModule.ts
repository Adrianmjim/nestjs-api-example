import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CatCoreModule } from '@nestjs-api-example/core/modules';

@Module({
  controllers: [],
  imports: [CqrsModule, CatCoreModule],
})
export class CatModule {}
