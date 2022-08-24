import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { EnvVariablesFixtures } from '../../../envVariable/fixture/domain/model/EnvVariablesFixtures';
import { HttpConfig } from './HttpConfig';

describe(HttpConfig.name, () => {
  describe('when instantiated', () => {
    let envVariablesFixture: EnvVariables;
    let loadEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<EnvVariables>>;
    let httpConfig: HttpConfig;

    beforeAll(() => {
      envVariablesFixture = EnvVariablesFixtures.any;
      loadEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(envVariablesFixture),
      };

      httpConfig = new HttpConfig(loadEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(httpConfig.port).toStrictEqual(envVariablesFixture.NODE_PORT);
    });
  });
});
