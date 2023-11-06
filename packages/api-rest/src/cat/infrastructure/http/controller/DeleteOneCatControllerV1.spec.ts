import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CatDeleteCommand } from '@nestjs-api-example/core/commands';
import { Cat } from '@nestjs-api-example/core/models';
import { CatFindOneQuery } from '@nestjs-api-example/core/queries';

import { DeleteOneCatControllerV1 } from './DeleteOneCatControllerV1';
import { EntityNotFoundException } from '../../../../common/domain/exception/EntityNotFoundException';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatFindOneQueryFixtures } from '../../../fixtures/domain/query/CatFindOneQueryFixtures';

describe(DeleteOneCatControllerV1.name, () => {
  let deleteOneCatControllerV1: DeleteOneCatControllerV1;
  let queryBusMock: jest.Mocked<QueryBus>;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    deleteOneCatControllerV1 = new DeleteOneCatControllerV1(commandBusMock, queryBusMock);
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
          result = await deleteOneCatControllerV1.deleteOne(catIdFixture);
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

      it('should throw a RpcException', () => {
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

        await deleteOneCatControllerV1.deleteOne(catIdFixture);
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
