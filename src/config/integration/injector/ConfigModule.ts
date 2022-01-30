import { Module, Provider } from '@nestjs/common';
import { EnvVariableModule } from '../../../envVariable/integration/injection/EnvVariableModule';
import { HttpConfig } from '../../integration/http/HttpConfig';
import { TypeOrmConfig } from '../../integration/typeOrm/service/TypeOrmConfig';
import { SwaggerConfig } from '../swagger/SwaggerConfig';

const configs: Provider[] = [HttpConfig, TypeOrmConfig, SwaggerConfig];

@Module({
  exports: configs,
  imports: [EnvVariableModule],
  providers: configs,
})
export class ConfigModule {}
