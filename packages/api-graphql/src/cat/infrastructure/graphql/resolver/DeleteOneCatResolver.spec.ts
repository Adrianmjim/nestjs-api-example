import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CatDeleteCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CatFindOneQuery } from '@nestjs-api-example/core/queries';

import { DeleteOneCatResolver } from './DeleteOneCatResolver';
import { EntityNotFoundException } from '../../../../common/domain/exception/EntityNotFoundException';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatFindOneQueryFixtures } from '../../../fixtures/domain/query/CatFindOneQueryFixtures';

describe(DeleteOneCatResolver.name, () => {
  let deleteOneCatResolver: DeleteOneCatResolver;
  let queryBusMock: jest.Mocked<QueryBus>;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    deleteOneCatResolver = new DeleteOneCatResolver(commandBusMock, queryBusMock);
  });

  describe('.deleteOne()', () => {
    describe('when called and cat is undefined', () => {
      let catIdFixture: string;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let result: unknown;

      beforeAll(async () => {
        catIdFixture = CatFixtures.any.id;
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = undefined;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        try {
          result = await deleteOneCatResolver.deleteOne(catIdFixture);
        } catch (err: unknown) {
          result = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should throw a EntityNotFoundException', () => {
        expect(result).toBeInstanceOf(EntityNotFoundException);
        expect((result as EntityNotFoundException).message).toBe(`Cat with id ${catIdFixture} not found`);
      });
    });

    describe('when called', () => {
      let catIdFixture: string;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let catDeleteCommandFixture: CatDeleteCommand;

      beforeAll(async () => {
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = CatFixtures.any;
        catIdFixture = catFixture.id;
        catDeleteCommandFixture = CatDeleteCommandFixtures.withId;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        await deleteOneCatResolver.deleteOne(catIdFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catDeleteCommandFixture);
      });
    });
  });
});
