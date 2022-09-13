import { EntityData } from '@mikro-orm/core';

import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync';

class BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest extends BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  BaseEntityUpdateCommand,
  EntityData<BaseEntityMikroOrm>
> {
  public constructor(
    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock: ConverterAsync<
      BaseEntitySetCommand,
      EntityData<BaseEntityMikroOrm>
    >,
  ) {
    super(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock);
  }
}

describe(BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntitySetCommand, EntityData<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync: BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync =
      new BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsyncTest(
        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateCommandFixture: BaseEntityUpdateCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateCommandFixture = BaseEntityUpdateCommandFixtures.any;
        baseEntitySetQueryMikroOrmFixture = BaseEntitySetQueryMikroOrmFixtures.any;

        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntitySetQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateCommandFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert()', () => {
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateCommandFixture.setCommand,
        );
      });

      it('should return a EntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });
});
