import { Manager } from '../../domain/service/Manager';
import { UpdateCommandHandler } from './UpdateCommandHandler';

interface ModelTest {
  foo: unknown;
}

interface CommandTest {
  fooValue: unknown;
}

describe(UpdateCommandHandler.name, () => {
  let updateCommandHandler: UpdateCommandHandler<ModelTest, CommandTest>;
  let updateManagerMock: jest.Mocked<Manager<CommandTest, ModelTest>>;

  beforeAll(() => {
    updateManagerMock = {
      manage: jest.fn(),
    };

    updateCommandHandler = new UpdateCommandHandler(updateManagerMock);
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

        updateManagerMock.manage.mockResolvedValueOnce(modelFixture);

        result = await updateCommandHandler.execute(commandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(updateManagerMock.manage).toHaveBeenCalledWith(commandFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
