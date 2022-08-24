import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { EnvVariablesFixtures } from '../../../envVariable/fixture/domain/model/EnvVariablesFixtures';
import { FirebaseConfig } from './FirebaseConfig';

describe(FirebaseConfig.name, () => {
  describe('when instantiated', () => {
    let envVariablesFixture: EnvVariables;
    let loadEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<EnvVariables>>;
    let firebaseConfig: FirebaseConfig;

    beforeAll(() => {
      envVariablesFixture = EnvVariablesFixtures.any;
      loadEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(envVariablesFixture),
      };

      firebaseConfig = new FirebaseConfig(loadEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(firebaseConfig.firebaseUrl).toStrictEqual(envVariablesFixture.FIREBASE_URL);
    });
  });
});
