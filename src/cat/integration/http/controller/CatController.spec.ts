import { NotFoundException } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Cat } from '../../../domain/model/Cat';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatInsertCommandFixtures } from '../../../fixtures/domain/command/CatInsertCommandFixtures';
import { CatUpdateCommandFixtures } from '../../../fixtures/domain/command/CatUpdateCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatFindQueryFixtures } from '../../../fixtures/domain/query/CatFindQueryFixtures';
import { InsertCatHttpV1Fixtures } from '../../../fixtures/integration/http/model/InsertCatHttpV1Fixtures';
import { UpdateCatHttpV1Fixtures } from '../../../fixtures/integration/http/model/UpdateCatHttpV1Fixtures';
import { InsertCatHttpV1 } from '../model/InsertCatHttpV1';
import { UpdateCatHttpV1 } from '../model/UpdateCatHttpV1';
import { CatController } from './CatController';

describe(CatController.name, () => {
  let queryBusMock: jest.Mocked<QueryBus>;
  let commandBusMock: jest.Mocked<CommandBus>;
  let catController: CatController;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    catController = new CatController(queryBusMock, commandBusMock);
  });

  describe('.create()', () => {
    describe('when called', () => {
      let catFixture: Cat;
      let insertCatHttpV1Fixture: InsertCatHttpV1;
      let catInsertCommandFixture: ICommand;
      let result: unknown;

      beforeAll(async () => {
        catFixture = CatFixtures.any;
        insertCatHttpV1Fixture = InsertCatHttpV1Fixtures.any;
        catInsertCommandFixture = CatInsertCommandFixtures.any;

        commandBusMock.execute.mockResolvedValueOnce(catFixture);

        result = await catController.create(insertCatHttpV1Fixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catInsertCommandFixture);
      });

      it('should return Cat', () => {
        expect(result).toEqual(catFixture);
      });
    });
  });

  describe('.find()', () => {
    describe('when called', () => {
      let ageFixture: number | undefined;
      let breedFixture: string | undefined;
      let nameFixture: string | undefined;
      let catFindQueryFixture: IQuery;
      let catsFixture: Cat[];
      let result: unknown;

      beforeAll(async () => {
        ageFixture = CatFindQueryFixtures.any.age;
        breedFixture = CatFindQueryFixtures.any.breed;
        nameFixture = CatFindQueryFixtures.any.name;

        catFindQueryFixture = CatFindQueryFixtures.any;
        catsFixture = [];

        queryBusMock.execute.mockResolvedValueOnce(catsFixture);

        result = await catController.find(ageFixture, breedFixture, nameFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindQueryFixture);
      });

      it('should return Cat[]', () => {
        expect(result).toStrictEqual(catsFixture);
      });
    });
  });

  describe('.findById()', () => {
    describe('when called and Cat is undefined', () => {
      let idFixture: string;
      let catsFixture: Cat[];
      let result: unknown;

      beforeAll(async () => {
        idFixture = CatFixtures.any.id;
        catsFixture = [];

        queryBusMock.execute.mockResolvedValueOnce(catsFixture);

        try {
          await catController.findById(idFixture);
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an EntityNotFoundException', () => {
        expect(result).toBeInstanceOf(NotFoundException);
        expect((result as NotFoundException).message).toBe(`Cat with id ${idFixture} not found`);
      });
    });

    describe('when called and Cat is Cat', () => {
      let idFixture: string;
      let catFindQueryFixture: IQuery;
      let catsFixture: Cat;
      let result: unknown;

      beforeAll(async () => {
        idFixture = CatFixtures.any.id;
        catFindQueryFixture = CatFindQueryFixtures.withId;
        catsFixture = CatFixtures.any;

        queryBusMock.execute.mockResolvedValueOnce([catsFixture]);

        result = await catController.findById(idFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindQueryFixture);
      });

      it('should return Cat', () => {
        expect(result).toStrictEqual(catsFixture);
      });
    });
  });

  describe('.delete()', () => {
    describe('when called', () => {
      let idFixture: string;
      let catDeleteCommandFixture: ICommand;

      beforeAll(async () => {
        idFixture = CatDeleteCommandFixtures.any.id;
        catDeleteCommandFixture = CatDeleteCommandFixtures.any;

        await catController.delete(idFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catDeleteCommandFixture);
      });
    });
  });

  describe('.update()', () => {
    describe('when called', () => {
      let catUpdateCommandFixture: ICommand;
      let updateCatHttpV1Fixture: UpdateCatHttpV1;
      let idFixture: string;

      beforeAll(async () => {
        catUpdateCommandFixture = CatUpdateCommandFixtures.any;
        updateCatHttpV1Fixture = UpdateCatHttpV1Fixtures.withName;
        idFixture = CatFixtures.any.id;

        await catController.update(idFixture, updateCatHttpV1Fixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catUpdateCommandFixture);
      });
    });
  });
});
