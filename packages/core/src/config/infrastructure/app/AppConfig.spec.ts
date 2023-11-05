import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { AppEnvVariables } from '../../../envVariable/domain/model/AppEnvVariables';
import { AppEnvVariablesFixtures } from '../../../envVariable/fixtures/domain/model/AppEnvVariablesFixtures';
import { AppConfig } from './AppConfig';

describe(AppConfig.name, () => {
  describe('when instantiated', () => {
    let appEnvVariablesFixture: AppEnvVariables;
    let loadAppEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<AppEnvVariables>>;
    let appConfig: AppConfig;

    beforeAll(() => {
      appEnvVariablesFixture = AppEnvVariablesFixtures.any;
      loadAppEnvVariablesAdapter = {
        loadData: jest.fn(),
      };

      loadAppEnvVariablesAdapter.loadData.mockReturnValueOnce(appEnvVariablesFixture);

      appConfig = new AppConfig(loadAppEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(appConfig.port).toStrictEqual(appEnvVariablesFixture.NODE_PORT);
    });
  });
});
