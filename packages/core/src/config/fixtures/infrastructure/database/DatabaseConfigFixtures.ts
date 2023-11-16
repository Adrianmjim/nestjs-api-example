import { DatabaseEnvVariablesFixtures } from '../../../../envVariable/fixtures/domain/model/DatabaseEnvVariablesFixtures';
import { DatabaseConfig } from '../../../infrastructure/database/DatabaseConfig';

export class DatabaseConfigFixtures {
  public static get any(): DatabaseConfig {
    const databaseConfig: DatabaseConfig = new DatabaseConfig({ loadData: () => DatabaseEnvVariablesFixtures.any });

    return databaseConfig;
  }
}
