import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { DeleteOneCatGrpc } from '../../../../infrastructure/grpc/model/DeleteOneCatGrpc';

export class DeleteOneCatGrpcFixtures {
  public static get any(): DeleteOneCatGrpc {
    const deleteOneCatGrpc: DeleteOneCatGrpc = new DeleteOneCatGrpc();

    deleteOneCatGrpc.id = CatFixtures.any.id;

    return deleteOneCatGrpc;
  }
}
