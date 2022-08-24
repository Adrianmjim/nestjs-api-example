import { Inject } from '@nestjs/common';

import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadEnvVariablesDotenvAdapter';

export class FirebaseConfig {
  public readonly firebaseUrl: string;

  public constructor(@Inject(LoadEnvVariablesDotenvAdapter) loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables>) {
    const envVariables: EnvVariables = loadEnvVariablesAdapter.loadData();

    this.firebaseUrl = envVariables.FIREBASE_URL;
  }
}
