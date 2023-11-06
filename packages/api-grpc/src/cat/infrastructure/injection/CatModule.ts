import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CatCoreModule } from '@nestjs-api-example/core/modules';

import { DeleteOneCatGrpcController } from '../grpc/controller/DeleteOneCatGrpcController';
import { FindOneCatGrpcController } from '../grpc/controller/FindOneCatGrpcController';
import { InsertCatGrpcController } from '../grpc/controller/InsertCatGrpcController';
import { InsertOneCatGrpcController } from '../grpc/controller/InsertOneCatGrpcController';
import { InsertOneStreamCatGrpcController } from '../grpc/controller/InsertOneStreamCatGrpcController';
import { PaginateFindCatGrpcController } from '../grpc/controller/PaginateFindCatGrpcController';
import { PaginateFindStreamCatGrpcController } from '../grpc/controller/PaginateFindStreamCatGrpcController';
import { UpdateCatGrpcController } from '../grpc/controller/UpdateCatGrpcController';
import { UpdateOneCatGrpcController } from '../grpc/controller/UpdateOneCatGrpcController';

@Module({
  controllers: [
    DeleteOneCatGrpcController,
    FindOneCatGrpcController,
    InsertCatGrpcController,
    InsertOneCatGrpcController,
    InsertOneStreamCatGrpcController,
    PaginateFindCatGrpcController,
    PaginateFindStreamCatGrpcController,
    UpdateCatGrpcController,
    UpdateOneCatGrpcController,
  ],
  imports: [CqrsModule, CatCoreModule],
})
export class CatModule {}
