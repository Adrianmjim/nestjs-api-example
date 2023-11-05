import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { DeleteAdapter } from '../adapter/DeleteAdapter';
import { DeleteManager } from './DeleteManager';

interface CommandTest {
  foo: unknown;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: jest.Mocked<DeleteAdapter<CommandTest>>;
  let deleteManager: DeleteManager<CommandTest>;

  beforeAll(() => {
    deleteAdapterMock = {
      delete: jest.fn(),
    };

    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await deleteManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledTimes(1);
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});