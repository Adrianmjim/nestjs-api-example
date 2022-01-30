import { Manager } from '../../domain/service/Manager';
import { InsertOneCommandHandler } from './InsertOneCommandHandler';

interface ModelTest {
  foo: unknown;
}

interface CommandTest {
  bar: unknown;
}

describe(InsertOneCommandHandler.name, () => {
  let insertOneCommandHandler: InsertOneCommandHandler<CommandTest, ModelTest>;
  let insertOneManagerMock: jest.Mocked<Manager<CommandTest, ModelTest>>;

  beforeAll(() => {
    insertOneManagerMock = {
      manage: jest.fn(),
    };

    insertOneCommandHandler = new InsertOneCommandHandler(insertOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandFixture: CommandTest;
      let modelFixture: ModelTest;

      let result: unknown;

      beforeAll(async () => {
        commandFixture = {
          bar: 'sample-value',
        };

        modelFixture = {
          foo: 'my-foo-sample-value',
        };

        insertOneManagerMock.manage.mockResolvedValueOnce(modelFixture);

        result = await insertOneCommandHandler.execute(commandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(insertOneManagerMock.manage).toHaveBeenCalledWith(commandFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelFixture);
      });
    });
  });
});
