import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { EntityData } from '@mikro-orm/core';
import { BaseEntityMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync } from './BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntitySetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntitySetQueryMikroOrmFixtures';

describe(BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.name, () => {
  let baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntitySetCommand, EntityData<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync: BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync<
    BaseEntityUpdateOneCommand,
    EntityData<BaseEntityMikroOrm>
  >;

  beforeAll(() => {
    baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync =
      new BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync(
        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateOneCommandFixture: BaseEntityUpdateOneCommand;
      let baseEntitySetQueryMikroOrmFixture: EntityData<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateOneCommandFixture = BaseEntityUpdateOneCommandFixtures.any;
        baseEntitySetQueryMikroOrmFixture = BaseEntitySetQueryMikroOrmFixtures.any;

        baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntitySetQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateOneCommandFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert()', () => {
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateOneCommandFixture.setCommand,
        );
      });

      it('should return a EntityData<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntitySetQueryMikroOrmFixture);
      });
    });
  });
});
