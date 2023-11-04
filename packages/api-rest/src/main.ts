import { AppConfig } from '@nestjs-api-example/core/models';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

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

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableShutdownHooks();

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('NestJS API Example')
    .setDescription('The cats API description')
    .setVersion('0.0.1')
    .addTag('cats')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const appConfig: AppConfig = app.get<AppConfig>(AppConfig);

  await app.listen(appConfig.port, '0.0.0.0');
}

void bootstrap();
