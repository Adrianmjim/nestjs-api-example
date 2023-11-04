import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CatInsertOneCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CommandBus } from '@nestjs/cqrs';
import { firstValueFrom, from } from 'rxjs';

import { CatInsertOneCommandFixtures } from '../../../fixtures/domain/command/CatInsertOneCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { InsertOneCatGrpcFixture } from '../../../fixtures/infrastructure/grpc/model/InsertOneCatGrpcFixtures';
import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';
import { InsertOneStreamCatGrpcController } from './InsertOneStreamCatGrpcController';

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
