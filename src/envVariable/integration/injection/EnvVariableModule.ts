import { Module } from '@nestjs/common';
import { LoadEnvVariablesDotenvAdapter } from '../adapter/LoadEnvVariablesDotenvAdapter';

@Module({
  exports: [LoadEnvVariablesDotenvAdapter],
  providers: [LoadEnvVariablesDotenvAdapter],
})
export class EnvVariableModule {}
