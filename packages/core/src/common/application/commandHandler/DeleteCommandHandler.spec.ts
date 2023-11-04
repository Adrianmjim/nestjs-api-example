import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { DeleteCommandHandler } from './DeleteCommandHandler';

interface CommandTest {
  foo: unknown;
}

describe(DeleteCommandHandler.name, () => {
  let deleteManagerMock: jest.Mocked<ManagerAsync<CommandTest, void>>;
  let deleteCommandHandler: DeleteCommandHandler<CommandTest>;

  beforeAll(() => {
    deleteManagerMock = {
      manage: jest.fn(),
    };

    deleteCommandHandler = new DeleteCommandHandler<CommandTest>(deleteManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await deleteCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteManager.manage()', () => {
        expect(deleteManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(deleteManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
