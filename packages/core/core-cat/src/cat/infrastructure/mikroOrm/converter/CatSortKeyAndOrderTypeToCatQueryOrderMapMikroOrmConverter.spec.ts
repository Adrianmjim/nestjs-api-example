import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Converter } from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderTypeFixtures } from '@nestjs-api-example/core-entity/fixture';
import { OrderType, CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatQueryOrderMapMikroOrmFixtures } from '@nestjs-api-example/core-entity-orm/fixture';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter } from './CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter';

describe(CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverterMock: jest.Mocked<Converter<OrderType, QueryOrder>>;
  let catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter: CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter;

  beforeAll(() => {
    orderTypeToQueryOrderMikroOrmConverterMock = {
      convert: jest.fn(),
    };

    catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter =
      new CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter(orderTypeToQueryOrderMikroOrmConverterMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catSortKeyAndOrderTypeFixture: CatSortKeyAndOrderType;
      let catQueryOrderMapMikroOrmFixture: QueryOrderMap<CatMikroOrm>;
      let result: unknown;

      beforeAll(() => {
        catSortKeyAndOrderTypeFixture = CatSortKeyAndOrderTypeFixtures.any;
        catQueryOrderMapMikroOrmFixture = CatQueryOrderMapMikroOrmFixtures.any;

        result = catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter.convert(catSortKeyAndOrderTypeFixture);
      });

      it('should return a QueryOrderMap<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catQueryOrderMapMikroOrmFixture);
      });
    });
  });
});
