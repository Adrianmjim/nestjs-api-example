import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { ObjectQuery } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from './BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync';
import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';
import { BaseEntityDeleteCommandFixtures } from '../../../fixtures/domain/command/BaseEntityDeleteCommandFixtures';
import { BaseEntityDeleteQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntityDeleteQueryMikroOrmFixtures';

class BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  BaseEntityDeleteCommand,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityDeleteQueryMikroOrmMock: jest.Mock<
      (
        input: BaseEntityDeleteCommand,
        baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
      ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
    >,
  ) {
    super();
  }

  protected async convertToSpecificEntityDeleteQueryMikroOrm(
    input: BaseEntityDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    return this.convertToEntityDeleteQueryMikroOrmMock(input, baseEntityDeleteQueryMikroOrm);
  }
}

describe(BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityDeleteQueryMikroOrmMock: jest.Mock<
    (
      input: BaseEntityDeleteCommand,
      baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
    ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync: BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityDeleteQueryMikroOrmMock =
      jest.fn<
        (
          input: BaseEntityDeleteCommand,
          baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
        ) => Promise<ObjectQuery<BaseEntityMikroOrm>>
      >();

    baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync =
      new BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsyncTest(
        convertToEntityDeleteQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityDeleteCommandFixture: BaseEntityDeleteCommand;
      let baseEntityDeleteQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityDeleteCommandFixture = BaseEntityDeleteCommandFixtures.withId;
        baseEntityDeleteQueryMikroOrmFixture = BaseEntityDeleteQueryMikroOrmFixtures.withId;

        convertToEntityDeleteQueryMikroOrmMock.mockResolvedValueOnce(baseEntityDeleteQueryMikroOrmFixture);

        result =
          await baseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync.convert(
            baseEntityDeleteCommandFixture,
          );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntityDeleteQueryMikroOrm()', () => {
        expect(convertToEntityDeleteQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityDeleteQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityDeleteCommandFixture,
          baseEntityDeleteQueryMikroOrmFixture,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityDeleteQueryMikroOrmFixture);
      });
    });
  });
});
