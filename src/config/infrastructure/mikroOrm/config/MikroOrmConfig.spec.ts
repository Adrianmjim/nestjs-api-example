import { LoadDataAdapter } from '../../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../../envVariable/domain/model/EnvVariables';
import { EnvVariablesFixtures } from '../../../../envVariable/fixture/domain/model/EnvVariablesFixtures';
import { MikroOrmConfig } from './MikroOrmConfig';

describe(MikroOrmConfig.name, () => {
  describe('when instantiated', () => {
    let envVariablesFixture: EnvVariables;
    let loadEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<EnvVariables>>;
    let mikroOrmConfig: MikroOrmConfig;

    beforeAll(() => {
      envVariablesFixture = EnvVariablesFixtures.any;
      loadEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(envVariablesFixture),
      };

      mikroOrmConfig = new MikroOrmConfig(loadEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(mikroOrmConfig.database).toStrictEqual(envVariablesFixture.DB_DATABASE);
      expect(mikroOrmConfig.host).toStrictEqual(envVariablesFixture.DB_HOST);
      expect(mikroOrmConfig.password).toStrictEqual(envVariablesFixture.DB_PASSWORD);
      expect(mikroOrmConfig.port).toStrictEqual(envVariablesFixture.DB_PORT);
      expect(mikroOrmConfig.user).toStrictEqual(envVariablesFixture.DB_USER);
    });
  });
});
