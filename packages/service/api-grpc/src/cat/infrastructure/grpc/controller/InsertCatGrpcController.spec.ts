import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatInsertCommand } from '@nestjs-api-example/core-cat/command';
import { CatInsertCommandFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { firstValueFrom, from } from 'rxjs';

import { InsertCatGrpcController } from './InsertCatGrpcController';
import { InsertOneCatGrpcFixture } from '../../../fixtures/infrastructure/grpc/model/InsertOneCatGrpcFixtures';
import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

describe(InsertCatGrpcController.name, () => {
  let insertCatGrpcController: InsertCatGrpcController;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    insertCatGrpcController = new InsertCatGrpcController(commandBusMock);
  });

  describe('.insert()', () => {
    describe('when called', () => {
      let insertOneCatGrpcFixture: InsertOneCatGrpc;
      let catInsertCommandFixture: CatInsertCommand;
      let catsFixture: Cat[];
      let result: unknown;

      beforeAll(async () => {
        insertOneCatGrpcFixture = InsertOneCatGrpcFixture.any;
        catInsertCommandFixture = CatInsertCommandFixtures.any;
        catsFixture = [CatFixtures.any];

        commandBusMock.execute.mockResolvedValueOnce(catsFixture);
        result = await firstValueFrom(insertCatGrpcController.insert(from([insertOneCatGrpcFixture])));
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catInsertCommandFixture);
      });

      it('should return a { items: Cat[] }', () => {
        expect(result).toStrictEqual({ items: catsFixture });
      });
    });
  });
});
