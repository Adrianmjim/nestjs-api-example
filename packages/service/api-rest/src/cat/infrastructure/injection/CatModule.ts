import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CatCoreModule } from '@nestjs-api-example/core-cat/module';

import { DeleteOneCatControllerV1 } from '../http/controller/DeleteOneCatControllerV1';
import { FindOneCatControllerV1 } from '../http/controller/FindOneCatControllerV1';
import { InsertOneCatControllerV1 } from '../http/controller/InsertOneCatControllerV1';
import { PaginateFindCatControllerV1 } from '../http/controller/PaginateFindCatControllerV1';
import { UpdateOneCatControllerV1 } from '../http/controller/UpdateOneCatControllerV1';

@Module({
  controllers: [
    DeleteOneCatControllerV1,
    FindOneCatControllerV1,
    InsertOneCatControllerV1,
    PaginateFindCatControllerV1,
    UpdateOneCatControllerV1,
  ],
  imports: [CqrsModule, CatCoreModule],
})
export class CatModule {}
