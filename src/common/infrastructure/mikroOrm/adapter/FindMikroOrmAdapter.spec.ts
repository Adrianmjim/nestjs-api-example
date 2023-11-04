import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { FindMikroOrmAdapter } from './FindMikroOrmAdapter';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let queryTestToQueryMikroOrmConverterAsyncMock: jest.Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOptionsQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<QueryTest, FindOptions<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let findMikroOrmAdapter: FindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      find: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    queryTestToQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    queryTestToFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    findMikroOrmAdapter = new FindMikroOrmAdapter(
      entityRepositoryMock,
      queryTestToQueryMikroOrmConverterAsyncMock,
      queryTestToFindOptionsQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.find()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOptionsQueryMikroOrmTestFixture: FindOptions<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {};
        findOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];

        (
          queryTestToQueryMikroOrmConverterAsyncMock.convert as jest.Mock<Promise<ObjectQuery<ModelTest>>>
        ).mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        (
          queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert as jest.Mock<Promise<FindOptions<ModelTest>>>
        ).mockResolvedValueOnce(findOptionsQueryMikroOrmTestFixture);
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);

        result = await findMikroOrmAdapter.find(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryTestToQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return ModelTest[]', () => {
        expect(result).toStrictEqual(modelTestFixtures);
      });
    });
  });
});
