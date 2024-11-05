import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import { join } from 'node:path';
import config from './config';
import { contextCreator } from './context';
import errors from './plugins/errors';
import liveReload from './plugins/liveReload';
import pages from './plugins/pages';
import renderer from './plugins/renderer';

const server = fastify({ logger: { level: config.logLevel } });

server.register(fastifyCookie);
server.register(fastifyStatic, { prefix: '/assets/', root: join(import.meta.dirname, 'assets') });
server.register(contextCreator);
server.register(renderer);
server.register(errors);
server.register(pages);
if (process.env.NODE_ENV === 'development') {
  server.register(liveReload);
}

await server.listen({ host: '0.0.0.0', port: config.port });
