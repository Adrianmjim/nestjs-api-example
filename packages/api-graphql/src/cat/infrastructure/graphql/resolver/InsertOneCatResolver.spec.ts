import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { CatInsertOneCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CommandBus } from '@nestjs/cqrs';

import { CatInsertOneCommandFixtures } from '../../../fixtures/domain/command/CatInsertOneCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { InsertOneCatGraphQlInputFixtures } from '../../../fixtures/infrastructure/graphql/model/InsertOneCatGraphQlInputFixtures';
import { InsertOneCatGraphQlInput } from '../model/InsertOneCatGraphQlInput';
import { InsertOneCatResolver } from './InsertOneCatResolver';

describe(InsertOneCatResolver.name, () => {
  let insertOneCatResolver: InsertOneCatResolver;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    insertOneCatResolver = new InsertOneCatResolver(commandBusMock);
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let insertOneCatGraphQlInputFixtures: InsertOneCatGraphQlInput;
      let catInsertOneCommandFixture: CatInsertOneCommand;
      let catFixture: Cat;
      let result: unknown;

      beforeAll(async () => {
        insertOneCatGraphQlInputFixtures = InsertOneCatGraphQlInputFixtures.any;
        catInsertOneCommandFixture = CatInsertOneCommandFixtures.any;
        catFixture = CatFixtures.any;

        commandBusMock.execute.mockResolvedValueOnce(catFixture);

        result = await insertOneCatResolver.insertOne(insertOneCatGraphQlInputFixtures);
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
