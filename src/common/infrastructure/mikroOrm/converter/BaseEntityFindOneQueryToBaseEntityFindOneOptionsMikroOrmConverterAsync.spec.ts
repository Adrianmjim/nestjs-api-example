import { FindOneOptions } from '@mikro-orm/core';

import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntityFindOneQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindOneQueryFixtures';
import { BaseEntityFindOneOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOneOptionsQueryMikroOrmFixtures copy';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from './BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';

class BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  BaseEntityFindOneQuery,
  FindOneOptions<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindOneOptionsQueryMikroOrmMock: jest.Mock<
      Promise<FindOneOptions<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToEntityFindOneOptionsQueryMikroOrm(
    input: BaseEntityFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<BaseEntityMikroOrm>> {
    return this.convertToEntityFindOneOptionsQueryMikroOrmMock(input, baseEntityFindOneOptionsQueryMikroOrm);
  }
}

describe(BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindOneOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOneOptions<BaseEntityMikroOrm>>>;
  let baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync: BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindOneOptionsQueryMikroOrmMock = jest.fn<Promise<FindOneOptions<BaseEntityMikroOrm>>, unknown[]>();

    baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync =
      new BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest(
        convertToEntityFindOneOptionsQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityFindOneQueryFixture: BaseEntityFindOneQuery;
      let baseEntityFindOneOptionsQueryMikroOrmFixture: FindOneOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFindOneQueryFixture = BaseEntityFindOneQueryFixtures.any;
        baseEntityFindOneOptionsQueryMikroOrmFixture = BaseEntityFindOneOptionsQueryMikroOrmFixtures.any;

        convertToEntityFindOneOptionsQueryMikroOrmMock.mockResolvedValueOnce(
          baseEntityFindOneOptionsQueryMikroOrmFixture,
        );

        result = await baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync.convert(
          baseEntityFindOneQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntityFindOneOptionsQueryMikroOrm()', () => {
        expect(convertToEntityFindOneOptionsQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityFindOneOptionsQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityFindOneQueryFixture,
          baseEntityFindOneOptionsQueryMikroOrmFixture,
        );
      });

      it('should return a FindOneOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOneOptionsQueryMikroOrmFixture);
      });
    });
  });
});
