import { DatabaseConfig } from '../../../infrastructure/database/DatabaseConfig';

export class DatabaseConfigFixtures {
  public static get any(): DatabaseConfig {
    const databaseConfig: DatabaseConfig = {
      database: 'DATABASE',
      host: 'HOST',
      password: 'PASSWORD',
      port: 1234,
      readReplicaHosts: ['REPLICA-HOST'],
      user: 'USER',
    };

    return databaseConfig;
  }
}
