import { BadRequestException } from '@nestjs/common';

import { ParsePositiveIntPipe } from './ParsePositiveIntPipe';

describe(ParsePositiveIntPipe.name, () => {
  let parsePositiveIntPipe: ParsePositiveIntPipe;

  beforeAll(() => {
    parsePositiveIntPipe = new ParsePositiveIntPipe();
  });

  describe('.transform()', () => {
    describe('having a value greater than 0', () => {
      let valueFixture: string;
      let result: unknown;

      beforeAll(async () => {
        valueFixture = '1';

        result = await parsePositiveIntPipe.transform(valueFixture, { type: 'query' });
      });

      it('should returns a positive number', () => {
        expect(result).toBe(1);
      });
    });

    describe('having a value less than 1', () => {
      let valueFixture: string;
      let dataFixture: string;
      let result: unknown;

      beforeAll(async () => {
        valueFixture = '0';
        dataFixture = 'paramFixture';

        try {
          await parsePositiveIntPipe.transform(valueFixture, { data: dataFixture, type: 'query' });
        } catch (error: unknown) {
          result = error;
        }
      });

      it('should throw a BadRequestException', () => {
        expect(result).toBeInstanceOf(BadRequestException);
        expect((result as BadRequestException).message).toBe(`${dataFixture} must be a positive number string`);
      });
    });
  });
});
