import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { EntityData } from '@mikro-orm/core';

import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntitySetCommandFixtures } from '../../../fixtures/domain/command/BaseEntitySetCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync';

class BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  BaseEntitySetCommand,
  EntityData<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntitySetQueryMikroOrmMock: jest.Mock<
      (
        input: BaseEntitySetCommand,
        baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
      ) => Promise<EntityData<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntitySetQueryMikroOrm(
    input: BaseEntitySetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<BaseEntityMikroOrm>> {
    return this.convertToEntitySetQueryMikroOrmMock(input, baseEntitySetQueryMikroOrm);
  }
}

describe(BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let convertToEntitySetQueryMikroOrmMock: jest.Mock<
    (
      input: BaseEntitySetCommand,
      baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
    ) => Promise<EntityData<BaseEntityMikroOrm>>
  >;

  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest: BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntitySetQueryMikroOrmMock =
      jest.fn<
        (
          input: BaseEntitySetCommand,
          baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
        ) => Promise<EntityData<BaseEntityMikroOrm>>
      >();

    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest =
      new BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest(convertToEntitySetQueryMikroOrmMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntitySetCommandFixture: BaseEntitySetCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntitySetCommandFixture = BaseEntitySetCommandFixtures.any;
        baseEntitySetQueryMikroOrmFixture = BaseEntitySetQueryMikroOrmFixtures.any;

        convertToEntitySetQueryMikroOrmMock.mockResolvedValueOnce(baseEntitySetQueryMikroOrmFixture);

        result =
          await baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest.convert(baseEntitySetCommandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntitySetQueryMikroOrm()', () => {
        expect(convertToEntitySetQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntitySetQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntitySetCommandFixture,
          baseEntitySetQueryMikroOrmFixture,
        );
      });

      it('should return a EntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });
});
