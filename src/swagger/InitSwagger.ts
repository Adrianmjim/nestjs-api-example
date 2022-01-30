import { createReadStream } from 'fs';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import Cookies from 'cookies';
import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction, RouteOptions } from 'fastify';
import jwt from 'jsonwebtoken';
import { SwaggerConfig } from '../config/integration/swagger/SwaggerConfig';

const DOC_LOGIN_HTML_PATH: string = '/../../src/swagger/html/swagger-login.html';
const COOKIE_NAME: string = 'ms::api-front-doc';

export function setUpSwagger(
  app: NestFastifyApplication,
  server: FastifyInstance,
  docUrl: string,
  name: string,
  modules: any[],
): void {
  const swaggerConfig: SwaggerConfig = app.get(SwaggerConfig);

  server.after(() => {
    server.addHook(
      'onRoute',
      (
        opts: RouteOptions & {
          routePath: string;
          path: string;
          prefix: string;
        },
      ): Promise<unknown> | void => {
        const url: string = opts.url;
        if (url !== `/${docUrl}-login` && url.startsWith(`/${docUrl}`)) {
          opts.onRequest = (request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction) => {
            const keys: string[] = ['admin'];
            const cookies: Cookies = new Cookies(request.raw, reply.raw, {
              keys,
            });
            const cookie: string | undefined = cookies.get(COOKIE_NAME, { signed: true });
            if (cookie !== undefined) {
              try {
                const firstKey: string = keys[0] as string;
                jwt.verify(cookie, firstKey);
                next();
                return;
              } catch {}
            }

            void reply.redirect(`/${docUrl}-login`);
          };
        }
      },
    );

    // login routes

    server.route({
      handler: (request: FastifyRequest, reply: FastifyReply) => {
        void reply
          .header('Content-Type', 'text/html; charset=UTF-8')
          .send(createReadStream(__dirname + DOC_LOGIN_HTML_PATH, 'utf8'));
      },
      method: 'GET',
      url: `/${docUrl}-login`,
    });

    server.route({
      handler: (request: FastifyRequest<any, any, any>, reply: FastifyReply) => {
        const keys: string[] = ['admin'];
        const pw: string = swaggerConfig.password ?? 'admin';
        const you_know: string = request.body.you_know;
        if (you_know !== pw) {
          void reply.redirect(`/${docUrl}-login`);
          return;
        }

        const firstKey: string = keys[0] as string;

        const token: string = jwt.sign({ id: new Date().getTime() }, firstKey);
        const cookies: Cookies = new Cookies(request.raw, reply.raw, {
          keys,
        });
        cookies.set(COOKIE_NAME, token, { signed: true });
        void reply.redirect(`/${docUrl}`);
      },
      method: 'POST',
      url: `/${docUrl}-login`,
    });
  });

  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(name)
    .setDescription('Http server')
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options, { include: modules });
  SwaggerModule.setup(docUrl, app, document);
}
