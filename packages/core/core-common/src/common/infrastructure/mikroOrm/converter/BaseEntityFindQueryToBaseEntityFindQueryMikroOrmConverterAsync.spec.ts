import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { ObjectQuery } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';

class BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindQueryMikroOrmMock: jest.Mock<
      (
        input: BaseEntityFindQuery,
        baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
      ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityFindQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    return this.convertToEntityFindQueryMikroOrmMock(input, baseEntityFindQueryMikroOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindQueryMikroOrmMock: jest.Mock<
    (
      input: BaseEntityFindQuery,
      baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
    ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindQueryMikroOrmMock =
      jest.fn<
        (
          input: BaseEntityFindQuery,
          baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
        ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
      >();

    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest(convertToEntityFindQueryMikroOrmMock);
  });

  describe('.convert()', () => {
    describe('having a BaseEntityFindQuery with ids', () => {
      describe('when called', () => {
        let baseEntityFindQueryFixture: BaseEntityFindQuery;
        let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withIds;
          baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.withIds;

          convertToEntityFindQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindQueryMikroOrmFixture);

          result =
            await baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(baseEntityFindQueryFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call convertToEntityFindQueryMikroOrm()', () => {
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledTimes(1);
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledWith(
            baseEntityFindQueryFixture,
            baseEntityFindQueryMikroOrmFixture,
          );
        });

        it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
        });
      });
    });
  });
});
