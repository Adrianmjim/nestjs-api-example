import { FindConditions, QueryBuilder, Repository } from 'typeorm';
import { QueryToFindQueryTypeOrmConverter } from '../service/QueryToFindQueryTypeOrmConverter';
import { DeleteTypeOrmAdapter } from './DeleteTypeOrmAdapter';

interface IModelTest {
  foo: unknown;
}

interface IQueryTest {
  fooValue: unknown;
}

describe(DeleteTypeOrmAdapter.name, () => {
  let queryBuilderMock: jest.Mocked<QueryBuilder<IModelTest>>;
  let repositoryMock: jest.Mocked<Repository<IModelTest>>;
  let queryToQueryTypeOrmConverterMock: jest.Mocked<QueryToFindQueryTypeOrmConverter<IModelTest, IQueryTest>>;
  let deleteTypeOrmAdapter: DeleteTypeOrmAdapter<IModelTest, IQueryTest>;

  beforeAll(() => {
    queryBuilderMock = Object.assign(Object.create(QueryBuilder.prototype), {
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBuilder<IModelTest>>> as jest.Mocked<QueryBuilder<IModelTest>>);

    repositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
      delete: jest.fn(),
    } as Partial<jest.Mocked<Repository<IModelTest>>> as jest.Mocked<Repository<IModelTest>>;

    queryToQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };

    deleteTypeOrmAdapter = new DeleteTypeOrmAdapter(repositoryMock, queryToQueryTypeOrmConverterMock);
  });

  describe('.delete', () => {
    describe('when called and queryToQueryTypeOrmConverter returns FindConditions<IModelTest>', () => {
      let queryFixture: IQueryTest;
      let queryTypeOrmFixture: FindConditions<IModelTest>;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        queryTypeOrmFixture = {};

        (queryToQueryTypeOrmConverterMock.convert as jest.Mock<FindConditions<IModelTest>>).mockReturnValueOnce(
          queryTypeOrmFixture,
        );

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('should call repositoryMock.delete()', () => {
        expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(repositoryMock.delete).toHaveBeenCalledWith(queryTypeOrmFixture);
      });
    });

    describe('when called and queryToQueryTypeOrmConverter returns QueryBuilder<IModelTest>', () => {
      let queryFixture: IQueryTest;

      beforeAll(async () => {
        queryFixture = {
          fooValue: 'foo-value',
        };

        (queryToQueryTypeOrmConverterMock.convert as jest.Mock<QueryBuilder<IModelTest>>).mockReturnValueOnce(
          queryBuilderMock,
        );

        await deleteTypeOrmAdapter.delete(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call repository.createQueryBuilder()', () => {
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith();
      });

      it('should call queryBuilder.delete()', () => {
        expect(queryBuilderMock.delete).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.delete).toHaveBeenCalledWith();
      });

      it('should call queryToQueryTypeOrmConverter.convert()', () => {
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(queryToQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('should call queryBuilder.execute()', () => {
        expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.execute).toHaveBeenCalledWith();
      });
    });
  });
});
