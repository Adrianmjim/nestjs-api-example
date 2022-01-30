import { FindConditions } from 'typeorm';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFindQueryFixtures } from '../../../fixtures/domain/query/CatFindQueryFixtures';
import { CatFindQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/CatFindQueryTypeOrmFixtures';

import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatFindQueryToCatFindQueryTypeOrmConverter } from './CatFindQueryToCatFindQueryTypeOrmConverter';

describe(CatFindQueryToCatFindQueryTypeOrmConverter.name, () => {
  let catFindQueryToCatFindQueryTypeOrmConverter: CatFindQueryToCatFindQueryTypeOrmConverter;

  beforeAll(() => {
    catFindQueryToCatFindQueryTypeOrmConverter = new CatFindQueryToCatFindQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('having a CatFindQuery with age', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindQueryTypeOrmFixture: FindConditions<CatTypeOrm>;

      beforeAll(() => {
        catFindQueryFixture = CatFindQueryFixtures.withAge;
        catFindQueryTypeOrmFixture = CatFindQueryTypeOrmFixtures.withAge;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catFindQueryToCatFindQueryTypeOrmConverter.convert(catFindQueryFixture);
        });

        it('should return a FindConditions<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catFindQueryTypeOrmFixture);
        });
      });
    });

    describe('having a CatFindQuery with breed', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindQueryTypeOrmFixture: FindConditions<CatTypeOrm>;

      beforeAll(() => {
        catFindQueryFixture = CatFindQueryFixtures.withBreed;
        catFindQueryTypeOrmFixture = CatFindQueryTypeOrmFixtures.withBreed;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catFindQueryToCatFindQueryTypeOrmConverter.convert(catFindQueryFixture);
        });

        it('should return a FindConditions<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catFindQueryTypeOrmFixture);
        });
      });
    });

    describe('having a CatFindQuery with id', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindQueryTypeOrmFixture: FindConditions<CatTypeOrm>;

      beforeAll(() => {
        catFindQueryFixture = CatFindQueryFixtures.withId;
        catFindQueryTypeOrmFixture = CatFindQueryTypeOrmFixtures.withId;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catFindQueryToCatFindQueryTypeOrmConverter.convert(catFindQueryFixture);
        });

        it('should return a FindConditions<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catFindQueryTypeOrmFixture);
        });
      });
    });

    describe('having a CatFindQuery with name', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindQueryTypeOrmFixture: FindConditions<CatTypeOrm>;

      beforeAll(() => {
        catFindQueryFixture = CatFindQueryFixtures.withName;
        catFindQueryTypeOrmFixture = CatFindQueryTypeOrmFixtures.withName;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catFindQueryToCatFindQueryTypeOrmConverter.convert(catFindQueryFixture);
        });

        it('should return a FindConditions<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catFindQueryTypeOrmFixture);
        });
      });
    });
  });
});
