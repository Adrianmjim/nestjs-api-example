jest.mock('../../postgresql/typeguard/isPostgreSqlErrorWithErrorType');

import { EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../../postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';
import { UpdateMikroOrmAdapter } from './UpdateMikroOrmAdapter';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(UpdateMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let commandTestToFindQueryMikroOrmConverterMock: jest.Mocked<ConverterAsync<CommandTest, ObjectQuery<ModelTest>>>;
  let commandTestToSetQueryMikroOrmConverterMock: jest.Mocked<ConverterAsync<CommandTest, EntityData<ModelTest>>>;
  let updateMikroOrmAdapter: UpdateMikroOrmAdapter<CommandTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      assign: jest.fn(),
      find: jest.fn(),
      flush: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    commandTestToFindQueryMikroOrmConverterMock = {
      convert: jest.fn(),
    };

    commandTestToSetQueryMikroOrmConverterMock = {
      convert: jest.fn(),
    };

    updateMikroOrmAdapter = new UpdateMikroOrmAdapter(
      entityRepositoryMock,
      commandTestToFindQueryMikroOrmConverterMock,
      commandTestToSetQueryMikroOrmConverterMock,
    );
  });

  describe('.update()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let setQueryMikroOrmTestFixture: EntityData<ModelTest>;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        setQueryMikroOrmTestFixture = {
          foo: 'foo',
        };

        (
          commandTestToFindQueryMikroOrmConverterMock.convert as jest.Mock<Promise<ObjectQuery<ModelTest>>>
        ).mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        commandTestToSetQueryMikroOrmConverterMock.convert.mockResolvedValueOnce(setQueryMikroOrmTestFixture);

        await updateMikroOrmAdapter.update(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandTestToFindQueryMikroOrmConverter.convert()', () => {
        expect(commandTestToFindQueryMikroOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(commandTestToFindQueryMikroOrmConverterMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call commandTestToSetQueryMikroOrmConverter.convert()', () => {
        expect(commandTestToSetQueryMikroOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(commandTestToSetQueryMikroOrmConverterMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.assign()', () => {
        expect(entityRepositoryMock.assign).toHaveBeenCalledTimes(modelTestFixtures.length);
        for (let nthCall: number = 1; nthCall <= modelTestFixtures.length; nthCall++) {
          expect(entityRepositoryMock.assign).toHaveBeenNthCalledWith(
            nthCall,
            modelTestFixtures[nthCall - 1],
            setQueryMikroOrmTestFixture,
          );
        }
      });

      it('should call entityRepository.flush()', () => {
        expect(entityRepositoryMock.flush).toHaveBeenCalledTimes(1);
      });
    });

    describe('when called and entityRepository.flush throws an Error and isPostgreSqlErrorWithErrorType returns true', () => {
      describe('having error code PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
        let commandTestFixture: CommandTest;
        let modelTestFixture: ModelTest;
        let modelTestFixtures: ModelTest[];
        let errorFixture: PostgreSqlError;
        let result: unknown;

        beforeAll(async () => {
          commandTestFixture = {
            foo: 'foo',
          };
          modelTestFixture = {
            foo: 'foo',
          };
          modelTestFixtures = [modelTestFixture];
          errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

          entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
          entityRepositoryMock.flush.mockRejectedValueOnce(errorFixture);
          (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(true);

          try {
            await updateMikroOrmAdapter.update(commandTestFixture);
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
    });

    describe('when called and entityRepository.flush throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixture: ModelTest;
      let modelTestFixtures: ModelTest[];
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [modelTestFixture];
        errorFixture = new Error('Error when entityRepository.flush is called');

        entityRepositoryMock.find.mockResolvedValueOnce(modelTestFixtures);
        entityRepositoryMock.flush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(false);

        try {
          await updateMikroOrmAdapter.update(commandTestFixture);
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

      it('should throw an Error', () => {
        expect(result).toBe(errorFixture);
      });
    });
  });
});
