import { DeepPartial } from 'typeorm';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatDeleteCommandToCatDeleteQueryTypeOrmConverter } from './CatDeleteCommandToCatDeleteQueryTypeOrmConverter';

describe(CatDeleteCommandToCatDeleteQueryTypeOrmConverter.name, () => {
  let catDeleteCommandToCatDeleteQueryTypeOrmConverter: CatDeleteCommandToCatDeleteQueryTypeOrmConverter;

  beforeAll(() => {
    catDeleteCommandToCatDeleteQueryTypeOrmConverter = new CatDeleteCommandToCatDeleteQueryTypeOrmConverter();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let inputFixture: CatDeleteCommand;
      let result: unknown;

      beforeAll(() => {
        inputFixture = CatDeleteCommandFixtures.any;

        result = catDeleteCommandToCatDeleteQueryTypeOrmConverter.convert(inputFixture);
      });

      it('should return a DeepPartial<Cat>', () => {
        const expected: DeepPartial<Cat> = {
          id: inputFixture.id,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
