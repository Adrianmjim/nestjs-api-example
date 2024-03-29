import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatUpdateOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatUpdateOneCommandFixtures } from '@nestjs-api-example/core-cat/fixture';

import { UpdateOneCatGrpcController } from './UpdateOneCatGrpcController';
import { UpdateOneCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/UpdateOneCatGrpcFixtures';
import { UpdateOneCatGrpc } from '../model/UpdateOneCatGrpc';

describe(UpdateOneCatGrpcController.name, () => {
  let updateOneCatGrpcController: UpdateOneCatGrpcController;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    updateOneCatGrpcController = new UpdateOneCatGrpcController(commandBusMock);
  });

  describe('.deleteOne()', () => {
    describe('when called', () => {
      let updateOneCatGrpcFixture: UpdateOneCatGrpc;
      let catUpdateOneCommandFixture: CatUpdateOneCommand;

      beforeAll(async () => {
        updateOneCatGrpcFixture = UpdateOneCatGrpcFixtures.any;
        catUpdateOneCommandFixture = CatUpdateOneCommandFixtures.any;

        await updateOneCatGrpcController.updateOne(updateOneCatGrpcFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catUpdateOneCommandFixture);
      });
    });
  });
});
