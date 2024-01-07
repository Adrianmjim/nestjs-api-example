import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { Pagination } from '@nestjs-api-example/core-entity/model';

import { PaginateFindManager } from './PaginateFindManager';
import { PaginateFindAdapter } from '../adapter/PaginateFindAdapter';

interface QueryTest {
  foo: unknown;
}

interface ModelTest {
  foo: unknown;
}

describe(PaginateFindManager.name, () => {
  let paginateFindAdapterMock: jest.Mocked<PaginateFindAdapter<QueryTest, ModelTest>>;
  let paginateFindManager: PaginateFindManager<QueryTest, ModelTest>;

  beforeAll(() => {
    paginateFindAdapterMock = {
      paginateFind: jest.fn(),
    };

    paginateFindManager = new PaginateFindManager(paginateFindAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let paginationModelTestFixture: Pagination<ModelTest>;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        paginationModelTestFixture = {
          items: [
            {
              foo: 'foo',
            },
          ],
          meta: {
            currentPage: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
        };

        paginateFindAdapterMock.paginateFind.mockResolvedValueOnce(paginationModelTestFixture);

        result = await paginateFindManager.manage(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call paginateFindAdapter.paginateFind()', () => {
        expect(paginateFindAdapterMock.paginateFind).toHaveBeenCalledTimes(1);
        expect(paginateFindAdapterMock.paginateFind).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return Pagination<ModelTest>', () => {
        expect(result).toBe(paginationModelTestFixture);
      });
    });
  });
});
