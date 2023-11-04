import { ObjectQuery } from '@mikro-orm/core';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';
import { BaseEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityPaginateFindQueryFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';

class BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest extends BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  BaseEntityPaginateFindQuery,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock: ConverterAsync<
      BaseEntityFindQuery,
      ObjectQuery<BaseEntityMikroOrm>
    >,
  ) {
    super(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock);
  }
}

describe(BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest(
        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityPaginateFindQueryFixture: BaseEntityPaginateFindQuery;
      let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityPaginateFindQueryFixture = BaseEntityPaginateFindQueryFixtures.any;
        baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.any;

        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntityFindQueryMikroOrmFixture,
        );

        result = await baseEntityPaginateFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(
          baseEntityPaginateFindQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityPaginateFindQueryFixture.findQuery,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
