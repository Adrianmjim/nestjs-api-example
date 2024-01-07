import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { RequiredEntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from './BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { BaseEntityInsertOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityInsertOneCommandFixtures';
import { BaseEntityInsertOneQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntityInsertOneQueryMikroOrmFixtures';

class BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  BaseEntityInsertOneCommand,
  RequiredEntityData<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityInsertOneQueryMikroOrmMock: jest.Mock<
      (
        input: BaseEntityInsertOneCommand,
        baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
      ) => Promise<RequiredEntityData<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityInsertOneQueryMikroOrm(
    input: BaseEntityInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<BaseEntityMikroOrm>> {
    return this.convertToEntityInsertOneQueryMikroOrmMock(input, baseEntityInsertOneQueryMikroOrm);
  }
}

describe(BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityInsertOneQueryMikroOrmMock: jest.Mock<
    (
      input: BaseEntityInsertOneCommand,
      baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
    ) => Promise<RequiredEntityData<BaseEntityMikroOrm>>
  >;

  let baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest: BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityInsertOneQueryMikroOrmMock =
      jest.fn<
        (
          input: BaseEntityInsertOneCommand,
          baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
        ) => Promise<RequiredEntityData<BaseEntityMikroOrm>>
      >();

    baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest =
      new BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest(
        convertToEntityInsertOneQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityInsertOneCommandFixture: BaseEntityInsertOneCommand;
      let baseEntityInsertOneQueryMikroOrmFixture: RequiredEntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityInsertOneCommandFixture = BaseEntityInsertOneCommandFixtures.any;
        baseEntityInsertOneQueryMikroOrmFixture = BaseEntityInsertOneQueryMikroOrmFixtures.any;

        convertToEntityInsertOneQueryMikroOrmMock.mockResolvedValueOnce(baseEntityInsertOneQueryMikroOrmFixture);

        result = await baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncTest.convert(
          baseEntityInsertOneCommandFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntityInsertOneQueryMikroOrm()', () => {
        expect(convertToEntityInsertOneQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityInsertOneQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityInsertOneCommandFixture,
          baseEntityInsertOneQueryMikroOrmFixture,
        );
      });

      it('should return a RequiredEntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityInsertOneQueryMikroOrmFixture);
      });
    });
  });
});
