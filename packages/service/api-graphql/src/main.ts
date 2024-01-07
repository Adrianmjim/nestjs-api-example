import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '@nestjs-api-example/core-config/model';

import { AppModule } from './AppModule';

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: { origin: '*' },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  );

  const appConfig: AppConfig = app.get<AppConfig>(AppConfig);

  await app.listen(appConfig.port, '0.0.0.0');
}

void bootstrap();
