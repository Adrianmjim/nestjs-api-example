import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Converter } from '../../../../common/domain/service/Converter';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateCommandFixtures } from '../../../fixtures/domain/command/CatUpdateCommandFixtures';
import { CatSetQueryTypeOrmFixtures } from '../../../fixtures/integration/typeOrm/CatSetQueryTypeOrmFixtures';
import { CatTypeOrm } from '../model/CatTypeOrm';
import { CatUpdateCommandToCatSetQueryTypeOrmConverter } from './CatUpdateCommandToCatSetQueryTypeOrmConverter';

describe(CatUpdateCommandToCatSetQueryTypeOrmConverter.name, () => {
  let catSetCommandToCatSetQueryTypeOrmConverterMock: jest.Mocked<
    Converter<CatSetCommand, QueryDeepPartialEntity<CatTypeOrm>>
  >;

  let catUpdateCommandToCatSetQueryTypeOrmConverter: CatUpdateCommandToCatSetQueryTypeOrmConverter;

  beforeAll(() => {
    catSetCommandToCatSetQueryTypeOrmConverterMock = {
      convert: jest.fn(),
    };

    catUpdateCommandToCatSetQueryTypeOrmConverter = new CatUpdateCommandToCatSetQueryTypeOrmConverter(
      catSetCommandToCatSetQueryTypeOrmConverterMock,
    );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catUpdateCommandFixture: CatUpdateCommand;
      let catSetQueryTypeOrmFixture: QueryDeepPartialEntity<CatTypeOrm>;
      let result: unknown;

      beforeAll(() => {
        catUpdateCommandFixture = CatUpdateCommandFixtures.any;
        catSetQueryTypeOrmFixture = CatSetQueryTypeOrmFixtures.withAge;

        catSetCommandToCatSetQueryTypeOrmConverterMock.convert.mockReturnValueOnce(catSetQueryTypeOrmFixture);

        result = catUpdateCommandToCatSetQueryTypeOrmConverter.convert(catUpdateCommandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call CatFindQueryToCatFindQueryTypeOrmConverter.convert()', () => {
        expect(catSetCommandToCatSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(catSetCommandToCatSetQueryTypeOrmConverterMock.convert).toHaveBeenCalledWith(
          catUpdateCommandFixture.setCommand,
        );
      });

      it('should return a QueryDeepPartialEntity<CatTypeOrm>', () => {
        expect(result).toStrictEqual(catSetQueryTypeOrmFixture);
      });
    });
  });
});
