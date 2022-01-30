import { Manager } from '../../domain/service/Manager';
import { FindOneQueryHandler } from './FindOneQueryHandler';

interface ModelTest {
  foo: string;
}

interface QueryTest {
  fooValue: string;
}

describe(FindOneQueryHandler.name, () => {
  let findOneManagerMock: jest.Mocked<Manager<QueryTest, ModelTest | undefined>>;
  let findOneQueryHandler: FindOneQueryHandler<QueryTest, ModelTest>;

  beforeAll(() => {
    findOneManagerMock = {
      manage: jest.fn(),
    };

    findOneQueryHandler = new FindOneQueryHandler(findOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          fooValue: 'bar',
        };

        modelTestFixture = {
          foo: 'bar',
        };

        findOneManagerMock.manage.mockResolvedValueOnce(modelTestFixture);

        result = await findOneQueryHandler.execute(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findOneManager.manage()', () => {
        expect(findOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(findOneManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
