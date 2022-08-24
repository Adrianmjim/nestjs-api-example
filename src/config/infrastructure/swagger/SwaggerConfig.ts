import { Inject } from '@nestjs/common';

import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadEnvVariablesDotenvAdapter';

export class SwaggerConfig {
  public readonly password: string;

  constructor(@Inject(LoadEnvVariablesDotenvAdapter) loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables>) {
    const envVariables: EnvVariables = loadEnvVariablesAdapter.loadData();

    this.password = envVariables.SWAGGER_PASSWORD;
  }
}
