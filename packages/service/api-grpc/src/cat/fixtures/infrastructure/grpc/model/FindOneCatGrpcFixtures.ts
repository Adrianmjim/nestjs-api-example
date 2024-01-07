import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { FindOneCatGrpc } from '../../../../infrastructure/grpc/model/FindOneCatGrpc';

export class FindOneCatGrpcFixtures {
  public static get any(): FindOneCatGrpc {
    const findOneCatGrpc: FindOneCatGrpc = new FindOneCatGrpc();

    findOneCatGrpc.id = CatFixtures.any.id;

    return findOneCatGrpc;
  }
}
