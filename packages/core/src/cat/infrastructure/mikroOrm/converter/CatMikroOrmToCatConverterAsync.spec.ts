import { beforeAll, describe, expect, it } from '@jest/globals';

import { Cat } from '../../../domain/model/Cat';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/CatMikroOrmFixtures';
import { CatMikroOrm } from '../model/CatMikroOrm';
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
