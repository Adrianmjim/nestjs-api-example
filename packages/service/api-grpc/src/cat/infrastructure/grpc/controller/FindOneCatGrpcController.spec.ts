import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { status } from '@grpc/grpc-js';
import { QueryBus } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CatFindOneQueryFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFindOneQuery } from '@nestjs-api-example/core-cat/query';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindOneCatGrpcController } from './FindOneCatGrpcController';
import { FindOneCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/FindOneCatGrpcFixtures';
import { FindOneCatGrpc } from '../model/FindOneCatGrpc';

describe(FindOneCatGrpcController.name, () => {
  let findOneCatGrpcController: FindOneCatGrpcController;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    findOneCatGrpcController = new FindOneCatGrpcController(queryBusMock);
  });

  describe('.findOne()', () => {
    describe('when called and cat is undefined', () => {
      let findOneCatGrpcFixture: FindOneCatGrpc;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let result: unknown;

      beforeAll(async () => {
        findOneCatGrpcFixture = FindOneCatGrpcFixtures.any;
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = undefined;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        try {
          result = await findOneCatGrpcController.findOne(findOneCatGrpcFixture);
        } catch (err: unknown) {
          result = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should throw a RpcException', () => {
        expect(result).toBeInstanceOf(RpcException);
        expect(((result as RpcException).getError() as { code: string }).code).toBe(status.NOT_FOUND);
      });
    });

    describe('when called', () => {
      let findOneCatGrpcFixture: FindOneCatGrpc;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let result: unknown;

      beforeAll(async () => {
        findOneCatGrpcFixture = FindOneCatGrpcFixtures.any;
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = CatFixtures.any;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        result = await findOneCatGrpcController.findOne(findOneCatGrpcFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should throw a RpcException', () => {
        expect(result).toBe(catFixture);
      });
    });
  });
});
