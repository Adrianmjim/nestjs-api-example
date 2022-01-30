import fs from 'fs';
import path from 'path';
import * as envalid from 'envalid';
import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';
import { LoadDataDotenvAdapter } from './LoadDataDotenvAdapter';

interface DataTest {
  foo: string;
}

describe('LoadDataSyncDotenvAdapter component', () => {
  let envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<DataTest>;
  let envFilepathFixture: string;

  let loadDataSyncDotenvAdapter: LoadDataDotenvAdapter<DataTest>;

  beforeAll(() => {
    envToEnvValidatorEnvalidMap = {
      foo: envalid.str(),
    };

    envFilepathFixture = path.join(__dirname, 'LoadDataDotenvAdapter.int.spec.env');

    const fileContentFixture: string = 'foo=bar\n';

    if (!fs.existsSync(envFilepathFixture)) {
      fs.writeFileSync(envFilepathFixture, Buffer.from(fileContentFixture));
    }

    loadDataSyncDotenvAdapter = new LoadDataDotenvAdapter(envToEnvValidatorEnvalidMap, envFilepathFixture);
  });

  describe('.loadData()', () => {
    describe('when called', () => {
      let dataTestFixture: DataTest;

      let result: unknown;

      beforeAll(() => {
        dataTestFixture = {
          foo: 'bar',
        };

        result = loadDataSyncDotenvAdapter.loadData();
      });

      it('should return data', () => {
        expect(result).toStrictEqual(dataTestFixture);
      });
    });
  });
});
