import { FindConditions } from 'typeorm';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatUpdateCommandFixtures } from '../../../fixtures/domain/command/CatUpdateCommandFixtures';
import { CatFindQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/CatFindQueryTypeOrmFixtures';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatUpdateCommandToCatFindQueryTypeOrmConverter } from './CatUpdateCommandToCatFindQueryTypeOrmConverter';

describe(CatUpdateCommandToCatFindQueryTypeOrmConverter.name, () => {
  let catFindQueryToCatFindQueryTypeOrmConverterMock: jest.Mocked<Converter<CatFindQuery, FindConditions<CatTypeOrm>>>;

  let catUpdateCommandToCatFindQueryTypeOrmConverter: CatUpdateCommandToCatFindQueryTypeOrmConverter;

  beforeAll(() => {
    catFindQueryToCatFindQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };

    catUpdateCommandToCatFindQueryTypeOrmConverter = new CatUpdateCommandToCatFindQueryTypeOrmConverter(
      catFindQueryToCatFindQueryTypeOrmConverterMock,
    );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catUpdateCommandFixture: CatUpdateCommand;
      let catFindQueryTypeOrmFixture: FindConditions<CatTypeOrm>;
      let result: unknown;

      beforeAll(() => {
        catUpdateCommandFixture = CatUpdateCommandFixtures.any;
        catFindQueryTypeOrmFixture = CatFindQueryTypeOrmFixtures.withName;

        catFindQueryToCatFindQueryTypeOrmConverterMock.convert.mockReturnValueOnce(catFindQueryTypeOrmFixture);

        result = catUpdateCommandToCatFindQueryTypeOrmConverter.convert(catUpdateCommandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call CatFindQueryToCatFindQueryTypeOrmConverter.convert()', () => {
        expect(catFindQueryToCatFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(catFindQueryToCatFindQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(
          catUpdateCommandFixture.findQuery,
        );
      });

      it('should return a FindConditions<ICat>', () => {
        expect(result).toStrictEqual(catFindQueryTypeOrmFixture);
      });
    });
  });
});
