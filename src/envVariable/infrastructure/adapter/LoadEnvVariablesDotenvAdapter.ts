import path from 'path';

import { Injectable } from '@nestjs/common';

import { LoadDataDotenvAdapter } from '../../../env/infrastructure/dotenv/adapter/LoadDataDotenvAdapter';
import { EnvVariables } from '../../domain/model/EnvVariables';
import { envVariablesToEnvVariablesValidatorEnvalidMap } from '../envalid/model/envVariablesToEnvVariablesValidatorEnvalidMap';

@Injectable()
export class LoadEnvVariablesDotenvAdapter extends LoadDataDotenvAdapter<EnvVariables> {
  private static readonly ENV_VARIABLES_DOTENV_DEFAULT_FILE_NAME: string = '';

  constructor() {
    super(envVariablesToEnvVariablesValidatorEnvalidMap, LoadEnvVariablesDotenvAdapter.getEnvFilepath());
  }

  private static getEnvFilepath(): string {
    const dotenvName: string = process.env.ENV ?? LoadEnvVariablesDotenvAdapter.ENV_VARIABLES_DOTENV_DEFAULT_FILE_NAME;

    const envFilepath: string = path.join(process.cwd(), `${dotenvName}.env`);

    return envFilepath;
  }
}
