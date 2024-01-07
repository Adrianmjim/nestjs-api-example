import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { QueryBus } from '@nestjs/cqrs';
import { CatPaginateFindQueryFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatPaginateFindQuery } from '@nestjs-api-example/core-cat/query';
import { Pagination, Cat } from '@nestjs-api-example/core-entity/model';

import { PaginateFindCatResolver } from './PaginateFindCatResolver';
import { PaginateFindCatGraphQlInputFixtures } from '../../../fixtures/infrastructure/graphql/model/PaginateFindCatGraphQlInputFixtures';
import { PaginateFindCatGraphQlInput } from '../model/PaginateFindCatGraphQlInput';

describe(PaginateFindCatResolver.name, () => {
  let paginateFindCatResolver: PaginateFindCatResolver;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    paginateFindCatResolver = new PaginateFindCatResolver(queryBusMock);
  });

  describe('.paginateFind()', () => {
    describe('when called', () => {
      let paginateFindCatGraphQlInputFixture: PaginateFindCatGraphQlInput;
      let catPaginateFindQueryFixture: CatPaginateFindQuery;
      let paginationCatFixture: Pagination<Cat>;
      let result: unknown;

      beforeAll(async () => {
        paginateFindCatGraphQlInputFixture = PaginateFindCatGraphQlInputFixtures.any;
        catPaginateFindQueryFixture = CatPaginateFindQueryFixtures.any;
        paginationCatFixture = {
          items: [],
          meta: {
            currentPage: paginateFindCatGraphQlInputFixture.page,
            itemCount: 0,
            itemsPerPage: paginateFindCatGraphQlInputFixture.limit,
            totalItems: 0,
            totalPages: paginateFindCatGraphQlInputFixture.page,
          },
        };

        queryBusMock.execute.mockResolvedValueOnce(paginationCatFixture);

        result = await paginateFindCatResolver.paginateFind(paginateFindCatGraphQlInputFixture);
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
