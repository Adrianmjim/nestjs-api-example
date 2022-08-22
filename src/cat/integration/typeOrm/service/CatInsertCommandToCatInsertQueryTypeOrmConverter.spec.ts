import { DeepPartial } from 'typeorm';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertCommandFixtures } from '../../../fixtures/domain/command/CatInsertCommandFixtures';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatInsertCommandToCatInsertQueryTypeOrmConverter } from './CatInsertCommandToCatInsertQueryTypeOrmConverter';

describe(CatInsertCommandToCatInsertQueryTypeOrmConverter.name, () => {
  let catInsertCommandToCatInsertQueryTypeOrmConverter: CatInsertCommandToCatInsertQueryTypeOrmConverter;

  beforeAll(() => {
    catInsertCommandToCatInsertQueryTypeOrmConverter = new CatInsertCommandToCatInsertQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let inputFixture: CatInsertCommand;
      let result: unknown;

      beforeAll(() => {
        inputFixture = CatInsertCommandFixtures.any;

        result = catInsertCommandToCatInsertQueryTypeOrmConverter.convert(inputFixture);
      });

      it('should return a DeepPartial<CatTypeOrm>', () => {
        const expected: DeepPartial<CatTypeOrm> = {
          age: inputFixture.age,
          breed: inputFixture.breed,
          favouriteFood: {
            id: inputFixture.favouriteFoodId,
          },
          name: inputFixture.name,
          owner: {
            id: inputFixture.ownerId,
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
