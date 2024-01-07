import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatUpdateOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatUpdateOneCommandFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { UpdateOneCatControllerV1 } from './UpdateOneCatControllerV1';
import { UpdateOneCatHttpV1Fixtures } from '../../../fixtures/infrastructure/model/UpdateOneCatHttpV1Fixtures';
import { UpdateOneCatHttpV1 } from '../model/UpdateOneCatHttpV1';

describe(UpdateOneCatControllerV1.name, () => {
  let updateOneCatControllerV1: UpdateOneCatControllerV1;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    updateOneCatControllerV1 = new UpdateOneCatControllerV1(commandBusMock);
  });

  describe('.updateOne()', () => {
    describe('when called', () => {
      let catIdFixture: string;
      let updateOneCatHttpV1Fixture: UpdateOneCatHttpV1;
      let catUpdateOneCommandFixture: CatUpdateOneCommand;

      beforeAll(async () => {
        catIdFixture = CatFixtures.any.id;
        updateOneCatHttpV1Fixture = UpdateOneCatHttpV1Fixtures.any;
        catUpdateOneCommandFixture = CatUpdateOneCommandFixtures.any;

        await updateOneCatControllerV1.updateOne(catIdFixture, updateOneCatHttpV1Fixture);
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
