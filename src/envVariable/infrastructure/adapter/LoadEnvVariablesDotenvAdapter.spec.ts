jest.mock('path', () => ({ join: jest.fn() }));

import { join } from 'path';

import { LoadEnvVariablesDotenvAdapter } from './LoadEnvVariablesDotenvAdapter';

describe(LoadEnvVariablesDotenvAdapter.name, () => {
  describe('.constructor()', () => {
    describe('when called and process.env.ENV is undefined', () => {
      beforeAll(() => {
        new LoadEnvVariablesDotenvAdapter();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call path.join()', () => {
        expect(join).toHaveBeenCalledTimes(1);
        expect(join).toHaveBeenCalledWith(process.cwd(), '.env');
      });
    });

    describe('when called and process.env.ENV is string', () => {
      let envFixture: string;

      beforeAll(() => {
        envFixture = 'env-sample';

        process.env.ENV = envFixture;

        new LoadEnvVariablesDotenvAdapter();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call path.join()', () => {
        expect(join).toHaveBeenCalledTimes(1);
        expect(join).toHaveBeenCalledWith(process.cwd(), `${envFixture}.env`);
      });
    });
  });
});
