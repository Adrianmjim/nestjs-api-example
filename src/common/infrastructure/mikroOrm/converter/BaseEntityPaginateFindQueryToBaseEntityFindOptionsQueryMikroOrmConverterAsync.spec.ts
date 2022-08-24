import { FindOptions } from '@mikro-orm/core';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';
import { BaseEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityPaginateFindQueryFixtures';
import { BaseEntityFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOptionsQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from './BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';

class BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  BaseEntityPaginateFindQuery,
  FindOptions<BaseEntityMikroOrm>
> {
  public constructor(
    baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock: ConverterAsync<
      BaseEntityFindQuery,
      FindOptions<BaseEntityMikroOrm>
    >,
  ) {
    super(baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock);
  }
}

describe(BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntityFindQuery, FindOptions<BaseEntityMikroOrm>>
  >;
  let baseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync: BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync =
      new BaseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest(
        baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityPaginateFindQueryFixture: BaseEntityPaginateFindQuery;
      let baseEntityFindOptionsQueryMikroOrmFixture: FindOptions<BaseEntityMikroOrm>;
      let baseEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset: FindOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityPaginateFindQueryFixture = BaseEntityPaginateFindQueryFixtures.any;
        baseEntityFindOptionsQueryMikroOrmFixture = BaseEntityFindOptionsQueryMikroOrmFixtures.any;
        baseEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset =
          BaseEntityFindOptionsQueryMikroOrmFixtures.withLimitAndOffset;

        baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntityFindOptionsQueryMikroOrmFixture,
        );

        result = await baseEntityPaginateFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert(
          baseEntityPaginateFindQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(
          1,
        );
        expect(baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityPaginateFindQueryFixture.findQuery,
        );
      });

      it('should return a FindOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset);
      });
    });
  });
});
