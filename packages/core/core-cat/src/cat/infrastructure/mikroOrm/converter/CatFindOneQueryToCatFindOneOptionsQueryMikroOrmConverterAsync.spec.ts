import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Converter } from '@nestjs-api-example/core-common/converter';
import { CatSortKeyAndOrderType } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync } from './CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatFindOneQueryFixtures } from '../../../fixtures/domain/query/CatFindOneQueryFixtures';
import { CatFindOneOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/CatFindOneOptionsQueryMikroOrmFixtures';

describe(CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync.name, () => {
  let catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync: CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync;
  let catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock: jest.Mocked<
    Converter<CatSortKeyAndOrderType[], QueryOrderMap<CatMikroOrm>[]>
  >;

  beforeAll(() => {
    catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock = {
      convert: jest.fn(),
    };

    catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync =
      new CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync(
        catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFindOneOptionsQueryMikroOrmFixture: FindOneOptions<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catFindOneQueryFixture = CatFindOneQueryFixtures.any;
        catFindOneOptionsQueryMikroOrmFixture = CatFindOneOptionsQueryMikroOrmFixtures.any;

        result = await catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync.convert(catFindOneQueryFixture);
      });

      it('should return a FindOneOptions<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catFindOneOptionsQueryMikroOrmFixture);
      });
    });
  });
});
