import { beforeAll, describe, expect, it } from '@jest/globals';

import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { isPostgreSqlError } from './isPostgreSqlError';

describe(isPostgreSqlError.name, () => {
  describe('having a value undefined', () => {
    let valueFixture: undefined;

    beforeAll(() => {
      valueFixture = undefined;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isPostgreSqlError(valueFixture);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a value null', () => {
    let valueFixture: null;

    beforeAll(() => {
      valueFixture = null;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isPostgreSqlError(valueFixture);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a value with no code', () => {
    let valueFixture: unknown;

    beforeAll(() => {
      valueFixture = {};
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isPostgreSqlError(valueFixture);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a value with code', () => {
    let valueFixture: unknown;

    beforeAll(() => {
      valueFixture = PostgreSqlErrorFixtures.any;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isPostgreSqlError(valueFixture);
      });

      it('should return false', () => {
        expect(result).toBe(true);
      });
    });
  });
});