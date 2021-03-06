import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './AppModule';
import { HttpConfig } from './config/integration/http/HttpConfig';
import { setUpSwagger } from './swagger/InitSwagger';

async function bootstrap(): Promise<void> {
  const adapter: FastifyAdapter = new FastifyAdapter({ logger: true });
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {});
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  setUpSwagger(app, adapter.getInstance(), 'docs', 'Nestjs API Example', []);

  const httpConfig: HttpConfig = app.get(HttpConfig);

  await app.listen(httpConfig.port, '0.0.0.0');
}

void bootstrap();
