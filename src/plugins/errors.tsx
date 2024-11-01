import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import ErrorPage from '~/pages/ErrorPage';
import NotFoundPage from '~/pages/NotFoundPage';

const errors: FastifyPluginAsync = fp(async server => {
  server.setNotFoundHandler((_request, reply) => reply.status(404).render(<NotFoundPage />));
  server.setErrorHandler((_error, _request, reply) => reply.status(500).render(<ErrorPage />));
});

export default errors;
