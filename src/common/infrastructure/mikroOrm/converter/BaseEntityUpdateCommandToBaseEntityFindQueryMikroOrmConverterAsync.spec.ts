import { ObjectQuery } from '@mikro-orm/core';

import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityUpdateCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateCommandFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';
import { BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync';

class BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsyncTest extends BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  BaseEntityUpdateCommand,
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

describe(BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsyncTest(
        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateCommandFixture: BaseEntityUpdateCommand;
      let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateCommandFixture = BaseEntityUpdateCommandFixtures.any;
        baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.any;

        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntityFindQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateCommandFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateCommandFixture.findQuery,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
