import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { UpdateOneCommandHandler } from './UpdateOneCommandHandler';

interface CommandTest {
  foo: unknown;
}

describe(UpdateOneCommandHandler.name, () => {
  let updateOneManagerMock: jest.Mocked<ManagerAsync<CommandTest, void>>;
  let updateOneCommandHandler: UpdateOneCommandHandler<CommandTest>;

  beforeAll(() => {
    updateOneManagerMock = {
      manage: jest.fn(),
    };

    updateOneCommandHandler = new UpdateOneCommandHandler<CommandTest>(updateOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await updateOneCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(updateOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
