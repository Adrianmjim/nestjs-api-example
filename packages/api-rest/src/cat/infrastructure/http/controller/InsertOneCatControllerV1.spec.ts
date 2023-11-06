import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatInsertOneCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';

import { InsertOneCatControllerV1 } from './InsertOneCatControllerV1';
import { CatInsertOneCommandFixtures } from '../../../fixtures/domain/command/CatInsertOneCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { InsertOneCatHttpV1Fixtures } from '../../../fixtures/infrastructure/model/InsertOneCatHttpV1Fixtures';
import { InsertOneCatHttpV1 } from '../model/InsertOneCatHttpV1';

describe(InsertOneCatControllerV1.name, () => {
  let insertOneCatControllerV1: InsertOneCatControllerV1;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    insertOneCatControllerV1 = new InsertOneCatControllerV1(commandBusMock);
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let insertOneCatHttpV1Fixture: InsertOneCatHttpV1;
      let catInsertOneCommandFixture: CatInsertOneCommand;
      let catFixture: Cat;
      let result: unknown;

      beforeAll(async () => {
        insertOneCatHttpV1Fixture = InsertOneCatHttpV1Fixtures.any;
        catInsertOneCommandFixture = CatInsertOneCommandFixtures.any;
        catFixture = CatFixtures.any;

        commandBusMock.execute.mockResolvedValueOnce(catFixture);

        result = await insertOneCatControllerV1.insertOne(insertOneCatHttpV1Fixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catInsertOneCommandFixture);
      });

      it('should return a Cat', () => {
        expect(result).toBe(catFixture);
      });
    });
  });
});
