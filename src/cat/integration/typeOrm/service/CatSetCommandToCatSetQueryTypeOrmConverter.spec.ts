import { DeepPartial } from 'typeorm';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatSetCommandFixtures } from '../../../fixtures/domain/command/CatSetCommandFixtures';
import { CatSetQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/CatSetQueryTypeOrmFixtures';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatSetCommandToCatSetQueryTypeOrmConverter } from './CatSetCommandToCatSetQueryTypeOrmConverter';

describe(CatSetCommandToCatSetQueryTypeOrmConverter.name, () => {
  let catSetCommandToCatSetQueryTypeOrmConverter: CatSetCommandToCatSetQueryTypeOrmConverter;

  beforeAll(() => {
    catSetCommandToCatSetQueryTypeOrmConverter = new CatSetCommandToCatSetQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('having a CatSetCommand with age', () => {
      let catSetCommandFixture: CatSetCommand;
      let catSetQueryTypeOrmFixture: DeepPartial<CatTypeOrm>;

      beforeAll(() => {
        catSetCommandFixture = CatSetCommandFixtures.withAge;
        catSetQueryTypeOrmFixture = CatSetQueryTypeOrmFixtures.withAge;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catSetCommandToCatSetQueryTypeOrmConverter.convert(catSetCommandFixture);
        });

        it('should return a DeepPartial<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catSetQueryTypeOrmFixture);
        });
      });
    });

    describe('having a CatSetCommand with breed', () => {
      let catSetCommandFixture: CatSetCommand;
      let catSetQueryTypeOrmFixture: DeepPartial<CatTypeOrm>;

      beforeAll(() => {
        catSetCommandFixture = CatSetCommandFixtures.withBreed;
        catSetQueryTypeOrmFixture = CatSetQueryTypeOrmFixtures.withBreed;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catSetCommandToCatSetQueryTypeOrmConverter.convert(catSetCommandFixture);
        });

        it('should return a DeepPartial<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catSetQueryTypeOrmFixture);
        });
      });
    });

    describe('having a CatSetCommand with name', () => {
      let catSetCommandFixture: CatSetCommand;
      let catSetQueryTypeOrmFixture: DeepPartial<CatTypeOrm>;

      beforeAll(() => {
        catSetCommandFixture = CatSetCommandFixtures.withName;
        catSetQueryTypeOrmFixture = CatSetQueryTypeOrmFixtures.withName;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = catSetCommandToCatSetQueryTypeOrmConverter.convert(catSetCommandFixture);
        });

        it('should return a DeepPartial<CatTypeOrm>', () => {
          expect(result).toStrictEqual(catSetQueryTypeOrmFixture);
        });
      });
    });
  });
});
