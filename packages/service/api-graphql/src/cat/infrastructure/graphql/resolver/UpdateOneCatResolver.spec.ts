import { jest, describe, beforeAll, afterAll, expect, it } from '@jest/globals';

import { CommandBus } from '@nestjs/cqrs';
import { CatUpdateOneCommand } from '@nestjs-api-example/core-cat/command';
import { CatUpdateOneCommandFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';

import { UpdateOneCatResolver } from './UpdateOneCatResolver';
import { UpdateOneCatGraphQlInputFixtures } from '../../../fixtures/infrastructure/graphql/model/UpdateOneCatGraphQlInputFixtures';
import { UpdateOneCatGraphQlInput } from '../model/UpdateOneCatGraphQlInput';

describe(UpdateOneCatResolver.name, () => {
  let updateOneCatResolver: UpdateOneCatResolver;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    updateOneCatResolver = new UpdateOneCatResolver(commandBusMock);
  });

  describe('.updateOne()', () => {
    describe('when called', () => {
      let catIdFixture: string;
      let updateOneCatGraphQlInput: UpdateOneCatGraphQlInput;
      let catUpdateOneCommandFixture: CatUpdateOneCommand;

      beforeAll(async () => {
        catIdFixture = CatFixtures.any.id;
        updateOneCatGraphQlInput = UpdateOneCatGraphQlInputFixtures.any;
        catUpdateOneCommandFixture = CatUpdateOneCommandFixtures.any;

        await updateOneCatResolver.updateOne(catIdFixture, updateOneCatGraphQlInput);
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
