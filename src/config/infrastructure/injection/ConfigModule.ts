import { Module, Provider } from '@nestjs/common';

import { EnvVariableModule } from '../../../envVariable/infrastructure/injection/EnvVariableModule';
import { FirebaseConfig } from '../../domain/config/FirebaseConfig';
import { HttpConfig } from '../http/HttpConfig';
import { MikroOrmConfig } from '../mikroOrm/config/MikroOrmConfig';
import { SwaggerConfig } from '../swagger/SwaggerConfig';

const configs: Provider[] = [FirebaseConfig, HttpConfig, MikroOrmConfig, SwaggerConfig];

@Module({
  exports: configs,
  imports: [EnvVariableModule],
  providers: configs,
})
export class ConfigModule {}
