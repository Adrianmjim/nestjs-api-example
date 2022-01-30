import { Manager } from '../../domain/service/Manager';
import { DeleteCommandHandler } from './DeleteCommandHandler';

interface ModelTest {
  foo: unknown;
}

interface CommandTest {
  fooValue: unknown;
}

describe(DeleteCommandHandler.name, () => {
  let deleteCommandHandler: DeleteCommandHandler<ModelTest, CommandTest>;
  let deleteManagerMock: jest.Mocked<Manager<CommandTest, ModelTest>>;

  beforeAll(() => {
    deleteManagerMock = {
      manage: jest.fn(),
    };

    deleteCommandHandler = new DeleteCommandHandler(deleteManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let modelFixture: ModelTest;
      let commandFixture: CommandTest;
      let result: unknown;

      beforeAll(async () => {
        modelFixture = {
          foo: 'bar',
        };
        commandFixture = {
          fooValue: 'foo',
        };

        deleteManagerMock.manage.mockResolvedValueOnce(modelFixture);
        result = await deleteCommandHandler.execute(commandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteManager.manage()', () => {
        expect(deleteManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(deleteManagerMock.manage).toHaveBeenCalledWith(commandFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
