import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { Cat, Pagination } from '@nestjs-api-example/core/models';
import { CatPaginateFindQuery } from '@nestjs-api-example/core/queries';
import { QueryBus } from '@nestjs/cqrs';

import { CatPaginateFindQueryFixtures } from '../../../fixtures/domain/query/CatPaginateFindQueryFixtures';
import { PaginateFindCatHttpV1Fixtures } from '../../../fixtures/infrastructure/model/PaginateFindCatHttpV1Fixtures';
import { PaginateFindCatHttpV1 } from '../model/PaginateFindCatHttpV1';
import { PaginateFindCatControllerV1 } from './PaginateFindCatControllerV1';

describe(PaginateFindCatControllerV1.name, () => {
  let paginateFindCatControllerV1: PaginateFindCatControllerV1;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    paginateFindCatControllerV1 = new PaginateFindCatControllerV1(queryBusMock);
  });

  describe('.paginateFind()', () => {
    describe('when called', () => {
      let paginateFindCatHttpV1Fixture: PaginateFindCatHttpV1;
      let catPaginateFindQueryFixture: CatPaginateFindQuery;
      let paginationCatFixture: Pagination<Cat>;
      let result: unknown;

      beforeAll(async () => {
        paginateFindCatHttpV1Fixture = PaginateFindCatHttpV1Fixtures.any;
        catPaginateFindQueryFixture = CatPaginateFindQueryFixtures.any;
        paginationCatFixture = {
          items: [],
          meta: {
            currentPage: paginateFindCatHttpV1Fixture.page,
            itemCount: 0,
            itemsPerPage: paginateFindCatHttpV1Fixture.limit,
            totalItems: 0,
            totalPages: paginateFindCatHttpV1Fixture.page,
          },
        };

        queryBusMock.execute.mockResolvedValueOnce(paginationCatFixture);

        result = await paginateFindCatControllerV1.paginateFind(paginateFindCatHttpV1Fixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catPaginateFindQueryFixture);
      });

      it('should return a Pagination<Cat>', () => {
        expect(result).toStrictEqual(paginationCatFixture);
      });
    });
  });
});
