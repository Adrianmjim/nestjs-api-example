import { FindOptions } from '@mikro-orm/core';

import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOptionsQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';

class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  FindOptions<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOptions<BaseEntityMikroOrm>>>,
  ) {
    super();
  }

  protected async convertToEntityFindOptionsQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<BaseEntityMikroOrm>> {
    return this.convertToEntityFindOptionsQueryMikroOrmMock(input, baseEntityFindOptionsQueryMikroOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOptions<BaseEntityMikroOrm>>>;
  let baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindOptionsQueryMikroOrmMock = jest.fn<Promise<FindOptions<BaseEntityMikroOrm>>, unknown[]>();

    baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest(
        convertToEntityFindOptionsQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityFindQueryFixture: BaseEntityFindQuery;
      let baseEntityFindOptionsQueryMikroOrmFixture: FindOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.any;
        baseEntityFindOptionsQueryMikroOrmFixture = BaseEntityFindOptionsQueryMikroOrmFixtures.any;

        convertToEntityFindOptionsQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindOptionsQueryMikroOrmFixture);

        result = await baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert(
          baseEntityFindQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntityFindOptionsQueryMikroOrm()', () => {
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityFindQueryFixture,
          baseEntityFindOptionsQueryMikroOrmFixture,
        );
      });

      it('should return a FindOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOptionsQueryMikroOrmFixture);
      });
    });
  });
});
