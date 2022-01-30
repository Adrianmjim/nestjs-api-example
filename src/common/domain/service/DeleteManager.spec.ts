import { DeleteAdapter } from './DeleteAdapter';
import { DeleteManager } from './DeleteManager';

interface ICommandTest {
  fooValue: unknown;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: jest.Mocked<DeleteAdapter<ICommandTest>>;
  let deleteManager: DeleteManager<ICommandTest>;

  beforeAll(() => {
    deleteAdapterMock = {
      delete: jest.fn(),
    } as Partial<jest.Mocked<DeleteAdapter<ICommandTest>>> as jest.Mocked<DeleteAdapter<ICommandTest>>;
    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandFixture: ICommandTest;

      beforeAll(async () => {
        commandFixture = { fooValue: 'bar' };

        await deleteManager.manage(commandFixture);
      });
      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledTimes(1);
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandFixture);
      });
    });
  });
});
