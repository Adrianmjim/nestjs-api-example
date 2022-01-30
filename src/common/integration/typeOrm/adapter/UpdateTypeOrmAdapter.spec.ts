import { FindConditions, QueryBuilder, Repository, UpdateQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Converter } from '../../../domain/service/Converter';
import { QueryToFindQueryTypeOrmConverter } from '../service/QueryToFindQueryTypeOrmConverter';
import { UpdateTypeOrmAdapter } from './UpdateTypeOrmAdapter';

interface IModelTest {
  foo: unknown;
}

interface IQueryTest {
  bar: unknown;
}

describe(UpdateTypeOrmAdapter.name, () => {
  let queryBuilderMock: jest.Mocked<UpdateQueryBuilder<IModelTest>>;
  let updateQueryToFindQueryTypeOrmConverterMock: jest.Mocked<QueryToFindQueryTypeOrmConverter<IModelTest, IQueryTest>>;
  let updateQueryToSetQueryTypeOrmConverterMock: jest.Mocked<Converter<IQueryTest, QueryDeepPartialEntity<IModelTest>>>;
  let repositoryMock: jest.Mocked<Repository<IModelTest>>;

  let updateTypeOrmAdapter: UpdateTypeOrmAdapter<IModelTest, IQueryTest>;

  beforeAll(() => {
    queryBuilderMock = Object.assign(Object.create(UpdateQueryBuilder.prototype), {
      execute: jest.fn(),
      set: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
    } as Partial<jest.Mocked<UpdateQueryBuilder<IModelTest>>> as jest.Mocked<UpdateQueryBuilder<IModelTest>>);
    updateQueryToFindQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };
    updateQueryToSetQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };
    repositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
      update: jest.fn(),
    } as Partial<jest.Mocked<Repository<IModelTest>>> as jest.Mocked<Repository<IModelTest>>;

    updateTypeOrmAdapter = new UpdateTypeOrmAdapter(
      updateQueryToFindQueryTypeOrmConverterMock,
      updateQueryToSetQueryTypeOrmConverterMock,
      repositoryMock,
    );
  });

  describe('.update()', () => {
    describe('when called and updateQueryToFindQueryTypeOrmConverter returns FindConditions<TModelDb>', () => {
      let queryFixture: IQueryTest;
      let findQueryTypeOrmFixture: FindConditions<IModelTest>;
      let setQueryTypeOrmFixture: QueryDeepPartialEntity<IModelTest>;

      beforeAll(async () => {
        queryFixture = {
          bar: 'sample',
        };

        findQueryTypeOrmFixture = {
          foo: 'sample-string',
        };

        setQueryTypeOrmFixture = {
          foo: 'sample-string-modified',
        };

        (
          updateQueryToFindQueryTypeOrmConverterMock.convert as jest.Mock<FindConditions<IModelTest>>
        ).mockReturnValueOnce(findQueryTypeOrmFixture);
        updateQueryToSetQueryTypeOrmConverterMock.convert.mockReturnValueOnce(setQueryTypeOrmFixture);

        await updateTypeOrmAdapter.update(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('shoud call updateQueryToFindQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('shoud call updateQueryToSetQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture);
      });

      it('shoud call repository.update()', () => {
        expect(repositoryMock.update).toHaveBeenCalledTimes(1);
        expect(repositoryMock.update).toHaveBeenCalledWith(findQueryTypeOrmFixture, setQueryTypeOrmFixture);
      });
    });

    describe('when called and updateQueryToFindQueryTypeOrmConverter returns QueryBuilder<TModelDb>', () => {
      let queryFixture: IQueryTest;
      let setQueryTypeOrmFixture: QueryDeepPartialEntity<IModelTest>;

      beforeAll(async () => {
        queryFixture = {
          bar: 'sample',
        };

        setQueryTypeOrmFixture = {
          foo: 'sample-string-modified',
        };

        (updateQueryToFindQueryTypeOrmConverterMock.convert as jest.Mock<QueryBuilder<IModelTest>>).mockReturnValueOnce(
          queryBuilderMock,
        );
        updateQueryToSetQueryTypeOrmConverterMock.convert.mockReturnValueOnce(setQueryTypeOrmFixture);

        await updateTypeOrmAdapter.update(queryFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('shoud call updateQueryToFindQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture, queryBuilderMock);
      });

      it('shoud call updateQueryToSetQueryTypeOrmConverter.convert()', () => {
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(updateQueryToSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(queryFixture);
      });

      it('shoud call queryBuilder.set()', () => {
        expect(queryBuilderMock.set).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.set).toHaveBeenCalledWith(setQueryTypeOrmFixture);
      });

      it('shoud call queryBuilder.execute()', () => {
        expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBuilderMock.execute).toHaveBeenCalledWith();
      });
    });
  });
});
