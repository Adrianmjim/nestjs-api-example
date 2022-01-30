import { LoadDataAdapter } from '../../../common/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { EnvVariablesFixtures } from '../../../envVariable/fixture/domain/model/EnvVariablesFixtures';
import { SwaggerConfig } from './SwaggerConfig';

describe(SwaggerConfig.name, () => {
  describe('when instantiated', () => {
    let envVariablesFixture: EnvVariables;
    let loadEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<EnvVariables>>;
    let swaggerConfig: SwaggerConfig;

    beforeAll(() => {
      envVariablesFixture = EnvVariablesFixtures.any;
      loadEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(envVariablesFixture),
      };

      swaggerConfig = new SwaggerConfig(loadEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(swaggerConfig.password).toStrictEqual(envVariablesFixture.SWAGGER_PASSWORD);
    });
  });
});
