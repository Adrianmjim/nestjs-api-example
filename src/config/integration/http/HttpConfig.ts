import { Inject, Injectable } from '@nestjs/common';
import { LoadDataAdapter } from '../../../common/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../envVariable/integration/adapter/LoadEnvVariablesDotenvAdapter';

@Injectable()
export class HttpConfig {
  public readonly port: number;

  constructor(@Inject(LoadEnvVariablesDotenvAdapter) loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables>) {
    const envVariables: EnvVariables = loadEnvVariablesAdapter.loadData();

    this.port = envVariables.NODE_PORT;
  }
}
