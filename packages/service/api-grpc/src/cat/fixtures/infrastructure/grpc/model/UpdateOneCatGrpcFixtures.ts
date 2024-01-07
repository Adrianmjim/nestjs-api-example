import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { UpdateOneCatGrpc } from '../../../../infrastructure/grpc/model/UpdateOneCatGrpc';

export class UpdateOneCatGrpcFixtures {
  public static get any(): UpdateOneCatGrpc {
    const updateOneCatGrpc: UpdateOneCatGrpc = new UpdateOneCatGrpc();

    updateOneCatGrpc.id = CatFixtures.any.id;

    return updateOneCatGrpc;
  }
}
