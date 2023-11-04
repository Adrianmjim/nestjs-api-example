import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

jest.mock('dotenv');
jest.mock('envalid');

import dotenv from 'dotenv';
import { str, cleanEnv } from 'envalid';

import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';
import { LoadDataDotenvAdapter } from './LoadDataDotenvAdapter';

interface DataTest {
  foo: string;
}

describe('LoadDataDotenvAdapter', () => {
  let envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<DataTest>;

  let loadDataDotenvAdapter: LoadDataDotenvAdapter<DataTest>;

  beforeAll(() => {
    envToEnvValidatorEnvalidMap = {
      foo: str(),
    };

    loadDataDotenvAdapter = new LoadDataDotenvAdapter(envToEnvValidatorEnvalidMap);
  });

  describe('.loadData()', () => {
    describe('when called', () => {
      let dataTestFixture: DataTest;

      let result: unknown;

      beforeAll(() => {
        dataTestFixture = {
          foo: 'bar',
        };

        (cleanEnv as jest.Mock).mockReturnValueOnce(dataTestFixture);

        result = loadDataDotenvAdapter.loadData();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call dotenv.config()', () => {
        const expectedDotenvOptions: dotenv.DotenvConfigOptions = {
          path: `${process.cwd()}/.env`,
        };

        expect(dotenv.config).toHaveBeenCalledTimes(1);
        expect(dotenv.config).toHaveBeenCalledWith(expectedDotenvOptions);
      });

      it('should call cleanEnv()', () => {
        expect(cleanEnv).toHaveBeenCalledTimes(1);
        expect(cleanEnv).toHaveBeenCalledWith(process.env, envToEnvValidatorEnvalidMap, {});
      });

      it('should return data', () => {
        expect(result).toStrictEqual(dataTestFixture);
      });
    });
  });
});
