import { UpdateAdapter } from './UpdateAdapter';
import { UpdateManager } from './UpdateManager';

interface ICommandTest {
  fooValue: unknown;
}

describe(UpdateManager.name, () => {
  let updateAdapterMock: jest.Mocked<UpdateAdapter<ICommandTest>>;
  let updateManager: UpdateManager<ICommandTest>;

  beforeAll(() => {
    updateAdapterMock = {
      update: jest.fn(),
    } as Partial<jest.Mocked<UpdateAdapter<ICommandTest>>> as jest.Mocked<UpdateAdapter<ICommandTest>>;

    updateManager = new UpdateManager(updateAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandFixture: ICommandTest;

      beforeAll(async () => {
        commandFixture = { fooValue: 'bar' };

        await updateManager.manage(commandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateAdapter.update()', () => {
        expect(updateAdapterMock.update).toHaveBeenCalledTimes(1);
        expect(updateAdapterMock.update).toHaveBeenCalledWith(commandFixture);
      });
    });
  });
});
