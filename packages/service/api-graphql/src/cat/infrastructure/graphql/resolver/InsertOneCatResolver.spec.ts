import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatInsertOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatInsertOneCommandFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { InsertOneCatResolver } from './InsertOneCatResolver';
import { InsertOneCatGraphQlInputFixtures } from '../../../fixtures/infrastructure/graphql/model/InsertOneCatGraphQlInputFixtures';
import { InsertOneCatGraphQlInput } from '../model/InsertOneCatGraphQlInput';

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
