import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';

import { QueryBus } from '@nestjs/cqrs';
import { CatFindOneQueryFixtures } from '@nestjs-api-example/core-cat/fixture';
import { CatFindOneQuery } from '@nestjs-api-example/core-cat/query';
import { EntityNotFoundException } from '@nestjs-api-example/core-common/exception';
import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';

import { FindOneCatResolver } from './FindOneCatResolver';

describe(FindOneCatResolver.name, () => {
  let findOneCatResolver: FindOneCatResolver;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    findOneCatResolver = new FindOneCatResolver(queryBusMock);
  });

  describe('.findOne()', () => {
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
          result = await findOneCatResolver.findOne(catIdFixture);
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
      let result: unknown;

      beforeAll(async () => {
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = CatFixtures.any;
        catIdFixture = catFixture.id;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        result = await findOneCatResolver.findOne(catIdFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should return a Cat', () => {
        expect(result).toBe(catFixture);
      });
    });
  });
});
