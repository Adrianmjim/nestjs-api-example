import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Converter } from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFindQueryFixtures } from '../../../fixtures/domain/query/CatFindQueryFixtures';
import { CatFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/CatFindOptionsQueryMikroOrmFixtures';

describe(CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync;
  let catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock: jest.Mocked<
    Converter<CatSortKeyAndOrderType[], QueryOrderMap<CatMikroOrm>[]>
  >;

  beforeAll(() => {
    catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock = {
      convert: jest.fn(),
    };

    catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync =
      new CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync(
        catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindOptionsQueryMikroOrmFixture: FindOptions<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catFindQueryFixture = CatFindQueryFixtures.any;
        catFindOptionsQueryMikroOrmFixture = CatFindOptionsQueryMikroOrmFixtures.any;

        result = await catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync.convert(catFindQueryFixture);
      });

      it('should return a FindOptions<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catFindOptionsQueryMikroOrmFixture);
      });
    });
  });
});
