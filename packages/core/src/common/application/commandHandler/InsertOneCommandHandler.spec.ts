import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { InsertOneCommandHandler } from './InsertOneCommandHandler';

interface CommandTest {
  foo: unknown;
}

interface ModelTest {
  foo: unknown;
}

describe(InsertOneCommandHandler.name, () => {
  let insertOneManagerMock: jest.Mocked<ManagerAsync<CommandTest, ModelTest>>;
  let insertOneCommandHandler: InsertOneCommandHandler<CommandTest, ModelTest>;

  beforeAll(() => {
    insertOneManagerMock = {
      manage: jest.fn(),
    };

    insertOneCommandHandler = new InsertOneCommandHandler<CommandTest, ModelTest>(insertOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        insertOneManagerMock.manage.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(insertOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
