import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import * as envalid from 'envalid';

import { LoadDataAdapter } from '../../../domain/adapter/LoadDataAdapter';
import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';

@Injectable()
export class LoadDataDotenvAdapter<TData> implements LoadDataAdapter<TData> {
  public constructor(
    private readonly envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<TData>,
    private readonly envFilepath: string,
  ) {}

  public loadData(): TData {
    this.populateProcessEnv();

    const cleanEnvProxy: TData = this.cleanEnv();
    const cleanEnv: TData = { ...cleanEnvProxy };

    return cleanEnv;
  }

  private cleanEnv(): TData {
    const envalidOptions: envalid.CleanOptions<TData> = {};

    const cleanEnv: TData = envalid.cleanEnv(process.env, this.envToEnvValidatorEnvalidMap, envalidOptions);

    return cleanEnv;
  }

  private populateProcessEnv(): void {
    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: this.envFilepath,
    };

    dotenv.config(dotenvOptions);
  }
}
