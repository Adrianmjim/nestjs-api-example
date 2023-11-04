import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './AppModule';
import { HttpConfig } from './config/infrastructure/http/HttpConfig';

async function bootstrap(): Promise<void> {
  const adapter: FastifyAdapter = new FastifyAdapter({ logger: true });

  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    cors: { origin: '*' },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('8belts API')
    .setDescription('8belts API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableShutdownHooks();

  const httpConfig: HttpConfig = app.get(HttpConfig);

  await app.listen(httpConfig.port, '0.0.0.0');
}

void bootstrap();
