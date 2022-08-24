import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { EnvVariables } from '../../../envVariable/domain/model/EnvVariables';
import { LoadEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadEnvVariablesDotenvAdapter';
import { MikroOrmConfig } from './config/MikroOrmConfig';

const loadEnvVariablesAdapter: LoadDataAdapter<EnvVariables> = new LoadEnvVariablesDotenvAdapter();

const mikroOrmConfig: MikroOrmConfig = new MikroOrmConfig(loadEnvVariablesAdapter);

export default {
  dbName: mikroOrmConfig.database,
  entities: ['./dist/*/infrastructure/mikroOrm/model/*.js'],
  entitiesTs: ['./src/*/infrastructure/mikroOrm/model/*.ts'],
  host: mikroOrmConfig.host,
  migrations: {
    path: 'dist/common/infrastructure/mikroOrm/migrations',
    pathTs: 'src/common/infrastructure/mikroOrm/migrations',
  },
  password: mikroOrmConfig.password,
  port: mikroOrmConfig.port,
  type: 'postgresql',
  user: mikroOrmConfig.user,
};
