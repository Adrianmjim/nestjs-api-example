import { Manager } from '../../domain/service/Manager';
import { FindQueryHandler } from './FindQueryHandler';

interface ModelTest {
  foo: string;
}

interface QueryTest {
  fooValue: string;
}

describe(FindQueryHandler.name, () => {
  let findManagerMock: jest.Mocked<Manager<QueryTest, ModelTest[]>>;
  let findQueryHandler: FindQueryHandler<QueryTest, ModelTest>;

  beforeAll(() => {
    findManagerMock = {
      manage: jest.fn(),
    };

    findQueryHandler = new FindQueryHandler(findManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelsTestFixture: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          fooValue: 'bar',
        };

        modelsTestFixture = [
          {
            foo: 'bar',
          },
        ];

        findManagerMock.manage.mockResolvedValueOnce(modelsTestFixture);

        result = await findQueryHandler.execute(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findOneManager.manage()', () => {
        expect(findManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(findManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelsTestFixture);
      });
    });
  });
});
