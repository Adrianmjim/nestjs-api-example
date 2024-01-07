import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { InsertOneCatGrpc } from '../../../../infrastructure/grpc/model/InsertOneCatGrpc';

export class InsertOneCatGrpcFixture {
  public static get any(): InsertOneCatGrpc {
    const insertOneCatGrpc: InsertOneCatGrpc = new InsertOneCatGrpc();

    insertOneCatGrpc.bornDate = CatFixtures.any.bornDate;
    insertOneCatGrpc.color = CatFixtures.any.color;
    insertOneCatGrpc.name = CatFixtures.any.name;

    return insertOneCatGrpc;
  }
}
