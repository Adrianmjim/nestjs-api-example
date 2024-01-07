import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatInsertOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatInsertOneCommandFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { firstValueFrom, from } from 'rxjs';

import { InsertOneStreamCatGrpcController } from './InsertOneStreamCatGrpcController';
import { InsertOneCatGrpcFixture } from '../../../fixtures/infrastructure/grpc/model/InsertOneCatGrpcFixtures';
import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

describe(InsertOneStreamCatGrpcController.name, () => {
  let insertOneStreamCatGrpcController: InsertOneStreamCatGrpcController;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    insertOneStreamCatGrpcController = new InsertOneStreamCatGrpcController(commandBusMock);
  });

  describe('.insertOneStream()', () => {
    describe('when called', () => {
      let insertOneCatGrpcFixture: InsertOneCatGrpc;
      let catInsertOneCommandFixture: CatInsertOneCommand;
      let catFixture: Cat;
      let result: unknown;

      beforeAll(async () => {
        insertOneCatGrpcFixture = InsertOneCatGrpcFixture.any;
        catInsertOneCommandFixture = CatInsertOneCommandFixtures.any;
        catFixture = CatFixtures.any;

        commandBusMock.execute.mockResolvedValueOnce(catFixture);
        result = await firstValueFrom(
          insertOneStreamCatGrpcController.insertOneStream(from([insertOneCatGrpcFixture])),
        );
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
