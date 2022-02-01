import { ParseIntOrUndefinedPipe } from './ParseIntOrUndefinedPipe';

describe(ParseIntOrUndefinedPipe.name, () => {
  let parseIntOrUndefinedPipe: ParseIntOrUndefinedPipe;

  beforeAll(() => {
    parseIntOrUndefinedPipe = new ParseIntOrUndefinedPipe();
  });

  describe('.transform()', () => {
    describe('when called and value is undefined', () => {
      let valueFixture: string | undefined;
      let resultFixture: number | undefined;
      let result: unknown;

      beforeAll(async () => {
        valueFixture = undefined;
        resultFixture = undefined;

        result = await parseIntOrUndefinedPipe.transform(valueFixture, { type: 'query' });
      });

      it('should return undefined', () => {
        expect(result).toStrictEqual(resultFixture);
      });
    });

    describe('when called and value is string', () => {
      let valueFixture: string | undefined;
      let resultFixture: number | undefined;
      let result: unknown;

      beforeAll(async () => {
        valueFixture = '5';
        resultFixture = 5;

        result = await parseIntOrUndefinedPipe.transform(valueFixture, { type: 'query' });
      });

      it('should return number', () => {
        expect(result).toStrictEqual(resultFixture);
      });
    });
  });
});
