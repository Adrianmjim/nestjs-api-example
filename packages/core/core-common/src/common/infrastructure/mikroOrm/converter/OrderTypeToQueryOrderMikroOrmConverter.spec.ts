import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { QueryOrder } from '@mikro-orm/core';
import { OrderTypeFixtures } from '@nestjs-api-example/core-entity/fixture';
import { OrderType } from '@nestjs-api-example/core-entity/model';

import { OrderTypeToQueryOrderMikroOrmConverter } from './OrderTypeToQueryOrderMikroOrmConverter';
import { QueryOrderMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/QueryOrderMikroOrmFixtures';

describe(OrderTypeToQueryOrderMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverter: OrderTypeToQueryOrderMikroOrmConverter;

  beforeAll(() => {
    orderTypeToQueryOrderMikroOrmConverter = new OrderTypeToQueryOrderMikroOrmConverter();
  });

  describe('.convert()', () => {
    describe('having a OrderType.ASC', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.ASC;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.ASC;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });

    describe('having a OrderType.ASC_NULLS_FIRST', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.ASC_NULLS_FIRST;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.ASC_NULLS_FIRST;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });

    describe('having a OrderType.ASC_NULLS_LAST', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.ASC_NULLS_LAST;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.ASC_NULLS_LAST;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });

    describe('having a OrderType.DESC', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.DESC;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.DESC;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });

    describe('having a OrderType.DESC_NULLS_FIRST', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.DESC_NULLS_FIRST;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.DESC_NULLS_FIRST;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });

    describe('having a OrderType.DESC_NULLS_LAST', () => {
      describe('when called', () => {
        let orderTypeFixture: OrderType;
        let queryOrderMikroOrmFixture: QueryOrder;
        let result: unknown;

        beforeAll(() => {
          orderTypeFixture = OrderTypeFixtures.DESC_NULLS_LAST;
          queryOrderMikroOrmFixture = QueryOrderMikroOrmFixtures.DESC_NULLS_LAST;

          result = orderTypeToQueryOrderMikroOrmConverter.convert(orderTypeFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return a QueryOrder', () => {
          expect(result).toStrictEqual(queryOrderMikroOrmFixture);
        });
      });
    });
  });
});
