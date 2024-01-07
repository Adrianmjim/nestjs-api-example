import { beforeAll, describe, expect, it } from '@jest/globals';

import { CatFixtures } from '@nestjs-api-example/core-entity/fixture';
import { Cat } from '@nestjs-api-example/core-entity/model';
import { CatMikroOrmFixtures } from '@nestjs-api-example/core-entity-orm/fixture';
import { CatMikroOrm } from '@nestjs-api-example/core-entity-orm/model';

import { CatMikroOrmToCatConverterAsync } from './CatMikroOrmToCatConverterAsync';

describe(CatMikroOrmToCatConverterAsync.name, () => {
  let catMikroOrmToCatConverterAsync: CatMikroOrmToCatConverterAsync;

  beforeAll(() => {
    catMikroOrmToCatConverterAsync = new CatMikroOrmToCatConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catMikroOrmFixture: CatMikroOrm;
      let catFixture: Cat;
      let result: unknown;

      beforeAll(async () => {
        catMikroOrmFixture = CatMikroOrmFixtures.any;
        catFixture = CatFixtures.any;

        result = await catMikroOrmToCatConverterAsync.convert(catMikroOrmFixture);
      });

      it('should return a Cat', () => {
        expect(result).toStrictEqual(catFixture);
      });
    });
  });
});
