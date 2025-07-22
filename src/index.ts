import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import { join } from 'node:path';
import config from './config.js';
import { contextCreator } from './context.js';
import errors from './plugins/errors.js';
import liveReload from './plugins/liveReload.js';
import pages from './plugins/pages.js';
import renderer from './plugins/renderer.js';

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
