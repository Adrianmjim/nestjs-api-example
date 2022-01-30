import { LoadDataAdapter } from '../../../../common/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../../envVariable/domain/model/EnvVariables';
import { EnvVariablesFixtures } from '../../../../envVariable/fixture/domain/model/EnvVariablesFixtures';

import { TypeOrmConfig } from './TypeOrmConfig';

describe(TypeOrmConfig.name, () => {
  describe('when instantiated', () => {
    let envVariablesFixture: EnvVariables;
    let loadEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<EnvVariables>>;
    let typeOrmConfig: TypeOrmConfig;

    beforeAll(() => {
      envVariablesFixture = EnvVariablesFixtures.any;
      loadEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(envVariablesFixture),
      };

      typeOrmConfig = new TypeOrmConfig(loadEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(typeOrmConfig.database).toStrictEqual(envVariablesFixture.DB_DATABASE);
      expect(typeOrmConfig.host).toStrictEqual(envVariablesFixture.DB_HOST);
      expect(typeOrmConfig.password).toStrictEqual(envVariablesFixture.DB_PASSWORD);
      expect(typeOrmConfig.port).toStrictEqual(envVariablesFixture.DB_PORT);
      expect(typeOrmConfig.user).toStrictEqual(envVariablesFixture.DB_USER);
    });
  });
});
