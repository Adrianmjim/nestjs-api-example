jest.mock('dotenv');
jest.mock('envalid');

import dotenv from 'dotenv';
import * as envalid from 'envalid';

import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';
import { LoadDataDotenvAdapter } from './LoadDataDotenvAdapter';

interface DataTest {
  foo: string;
}

describe('LoadDataDotenvAdapter', () => {
  let envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<DataTest>;
  let envFilepathFixture: string;

  let loadDataDotenvAdapter: LoadDataDotenvAdapter<DataTest>;

  beforeAll(() => {
    envToEnvValidatorEnvalidMap = {
      foo: envalid.str(),
    };

    envFilepathFixture = 'sample-env-path';

    loadDataDotenvAdapter = new LoadDataDotenvAdapter(envToEnvValidatorEnvalidMap, envFilepathFixture);
  });

  describe('.loadData()', () => {
    describe('when called', () => {
      let dataTestFixture: DataTest;

      let result: unknown;

      beforeAll(() => {
        dataTestFixture = {
          foo: 'bar',
        };

        (envalid.cleanEnv as jest.Mock).mockReturnValueOnce(dataTestFixture);

        result = loadDataDotenvAdapter.loadData();
      });

      it('should call dotenv.config()', () => {
        const expectedDotenvOptions: dotenv.DotenvConfigOptions = {
          path: envFilepathFixture,
        };

        expect(dotenv.config).toHaveBeenCalledTimes(1);
        expect(dotenv.config).toHaveBeenCalledWith(expectedDotenvOptions);
      });

      it('should call envalid.cleanEnv()', () => {
        expect(envalid.cleanEnv).toHaveBeenCalledTimes(1);
        expect(envalid.cleanEnv).toHaveBeenCalledWith(process.env, envToEnvValidatorEnvalidMap, {});
      });

      it('should return data', () => {
        expect(result).toStrictEqual(dataTestFixture);
      });
    });
  });
});
