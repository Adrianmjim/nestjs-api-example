import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/model/CatTypeOrmFixtures';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatTypeOrmToCatConverter } from './CatTypeOrmToCatConverter';

describe(CatTypeOrmToCatConverter.name, () => {
  let catTypeOrmToCatConverter: CatTypeOrmToCatConverter;

  beforeAll(() => {
    catTypeOrmToCatConverter = new CatTypeOrmToCatConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let inputFixture: CatTypeOrm;
      let result: unknown;

      beforeAll(() => {
        inputFixture = CatTypeOrmFixtures.any;

        result = catTypeOrmToCatConverter.convert(inputFixture);
      });

      it('should return a Cat', () => {
        expect(result).toStrictEqual(CatFixtures.any);
      });
    });
  });
});
