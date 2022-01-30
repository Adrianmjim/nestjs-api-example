import { EnvVariables } from '../../../domain/model/EnvVariables';

export class EnvVariablesFixtures {
  public static get any(): EnvVariables {
    const envVariables: EnvVariables = {
      DB_DATABASE: 'DB-database',
      DB_HOST: 'DB-host',
      DB_PASSWORD: 'boss',
      DB_PORT: 12345,
      DB_USER: 'random-user',
      NODE_PORT: 23456,
      SWAGGER_PASSWORD: 'swagger-password',
    };

    return envVariables;
  }
}
