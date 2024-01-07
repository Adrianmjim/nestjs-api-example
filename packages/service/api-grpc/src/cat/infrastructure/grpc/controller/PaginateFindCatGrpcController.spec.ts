import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { QueryBus } from '@nestjs/cqrs';
import { CatPaginateFindQueryFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatPaginateFindQuery } from '@nestjs-api-example/core-cat/query';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Pagination, Cat } from '@nestjs-api-example/core-entity/model';

import { PaginateFindCatGrpcController } from './PaginateFindCatGrpcController';
import { PaginateFindCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/PaginateFindCatGrpcFixtures';
import { PaginateFindCatGrpc } from '../model/PaginateFindCatGrpc';

describe(PaginateFindCatGrpcController.name, () => {
  let paginateFindCatGrpcController: PaginateFindCatGrpcController;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    paginateFindCatGrpcController = new PaginateFindCatGrpcController(queryBusMock);
  });

  describe('.paginateFind()', () => {
    describe('when called', () => {
      let paginateFindCatGrpcFixture: PaginateFindCatGrpc;
      let catPaginateFindQueryFixture: CatPaginateFindQuery;
      let paginationCatFixture: Pagination<Cat>;
      let result: unknown;

      beforeAll(async () => {
        paginateFindCatGrpcFixture = PaginateFindCatGrpcFixtures.any;
        catPaginateFindQueryFixture = CatPaginateFindQueryFixtures.any;
        paginationCatFixture = {
          items: [CatFixtures.any],
          meta: {
            currentPage: 1,
            itemCount: 1,
            itemsPerPage: 1,
            totalItems: 1,
            totalPages: 1,
          },
        };

        queryBusMock.execute.mockResolvedValueOnce(paginationCatFixture);

        result = await paginateFindCatGrpcController.paginateFind(paginateFindCatGrpcFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catPaginateFindQueryFixture);
      });

      it('should return a Pagination<Cat>', () => {
        expect(result).toBe(paginationCatFixture);
      });
    });
  });
});
