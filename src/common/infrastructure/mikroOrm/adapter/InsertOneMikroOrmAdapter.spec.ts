jest.mock('../../postgresql/typeguard/isPostgreSqlErrorWithErrorType');

import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../../postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';
import { InsertOneMikroOrmAdapter } from './InsertOneMikroOrmAdapter';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let commandTestToInsertOneQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<CommandTest, RequiredEntityData<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let insertMikroOrmAdapter: InsertOneMikroOrmAdapter<CommandTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      create: jest.fn(),
      persistAndFlush: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    commandTestToInsertOneQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    insertMikroOrmAdapter = new InsertOneMikroOrmAdapter(
      entityRepositoryMock,
      commandTestToInsertOneQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);

        result = await insertMikroOrmAdapter.insertOne(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandTestToInsertOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.create()', () => {
        expect(entityRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(entityRepositoryMock.create).toHaveBeenCalledWith(insertOneQueryMikroOrmTestFixture);
      });

      it('should call entityRepository.persistAndFlush()', () => {
        expect(entityRepositoryMock.persistAndFlush).toHaveBeenCalledTimes(1);
        expect(entityRepositoryMock.persistAndFlush).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return an ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error and isPostgreSqlErrorWithErrorType returns true', () => {
      describe('having error code PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
        let commandTestFixture: CommandTest;
        let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
        let errorFixture: PostgreSqlError;
        let result: unknown;

        beforeAll(async () => {
          commandTestFixture = {
            foo: 'foo',
          };
          insertOneQueryMikroOrmTestFixture = {};
          errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

          commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
            insertOneQueryMikroOrmTestFixture,
          );
          entityRepositoryMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
          (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(true);

          try {
            await insertMikroOrmAdapter.insertOne(commandTestFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call isPostgreSqlErrorWithErrorType()', () => {
          expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(1);
          expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
            PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
          ]);
        });

        it('should throw an InvalidArgumentException', () => {
          expect(result).toBeInstanceOf(InvalidArgumentException);
          expect((result as InvalidArgumentException).message).toBe('Foreign key violation');
        });
      });

      describe('having error code PostgreSqlErrorType.UNIQUE_VIOLATION', () => {
        let commandTestFixture: CommandTest;
        let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
        let errorFixture: PostgreSqlError;
        let result: unknown;

        beforeAll(async () => {
          commandTestFixture = {
            foo: 'foo',
          };
          insertOneQueryMikroOrmTestFixture = {};
          errorFixture = PostgreSqlErrorFixtures.withCodeUniqueViolation;

          entityRepositoryMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
          commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
            insertOneQueryMikroOrmTestFixture,
          );
          (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

          try {
            await insertMikroOrmAdapter.insertOne(commandTestFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call isPostgreSqlErrorWithErrorType()', () => {
          expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(2);
          expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
            PostgreSqlErrorType.UNIQUE_VIOLATION,
          ]);
        });

        it('should throw an InvalidArgumentException', () => {
          expect(result).toBeInstanceOf(InvalidArgumentException);
          expect((result as InvalidArgumentException).message).toBe('Duplicated entity');
        });
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        errorFixture = new Error('Error when entityRepository.persistAndFlush is called');

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(false);

        try {
          await insertMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(2);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
          PostgreSqlErrorType.UNIQUE_VIOLATION,
        ]);
      });

      it('should throw an Error', () => {
        expect(result).toBe(errorFixture);
      });
    });
  });
});
