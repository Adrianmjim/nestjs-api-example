import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';
import { UpdateOneManager } from './UpdateOneManager';

interface CommandTest {
  foo: unknown;
}

describe(UpdateOneManager.name, () => {
  let updateOneAdapterMock: jest.Mocked<UpdateOneAdapter<CommandTest>>;
  let updateOneManager: UpdateOneManager<CommandTest>;

  beforeAll(() => {
    updateOneAdapterMock = {
      updateOne: jest.fn(),
    };

    updateOneManager = new UpdateOneManager(updateOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateOneManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateAdapter.updateOne()', () => {
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledTimes(1);
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
