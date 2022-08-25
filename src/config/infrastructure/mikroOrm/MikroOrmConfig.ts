import { Inject, Injectable } from '@nestjs/common';
import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';

import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadEnvVariablesDotenvAdapter';

@Injectable()
export class MikroOrmConfig {
  public readonly database: string;
  public readonly host: string;
  public readonly password: string;
  public readonly port: number;
  public readonly user: string;

  constructor(@Inject(LoadEnvVariablesDotenvAdapter) loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables>) {
    const envVariables: EnvVariables = loadEnvVariablesAdapter.loadData();

    this.database = envVariables.DB_DATABASE;
    this.host = envVariables.DB_HOST;
    this.password = envVariables.DB_PASSWORD;
    this.port = envVariables.DB_PORT;
    this.user = envVariables.DB_USER;
  }
}
