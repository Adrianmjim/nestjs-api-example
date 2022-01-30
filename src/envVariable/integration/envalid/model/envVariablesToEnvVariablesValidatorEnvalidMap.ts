import * as envalid from 'envalid';
import { EnvVariables } from '../../../domain/model/EnvVariables';

export const envVariablesToEnvVariablesValidatorEnvalidMap: {
  [TKey in keyof EnvVariables]: envalid.ValidatorSpec<EnvVariables[TKey]>;
} = {
  DB_DATABASE: envalid.str(),
  DB_HOST: envalid.host(),
  DB_PASSWORD: envalid.str(),
  DB_PORT: envalid.port(),
  DB_USER: envalid.str(),
  NODE_PORT: envalid.port(),
  SWAGGER_PASSWORD: envalid.str(),
};
