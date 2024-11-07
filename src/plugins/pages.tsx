import { FastifyPluginAsync } from 'fastify';
import docs from '~/docs';
import DocPage from '~/pages/DocPage';

const pages: FastifyPluginAsync = async server => {
  docs.forEach((doc, i) => {
    server.get(doc.href, (_request, reply) =>
      reply.render(
        <DocPage
          {...doc}
          previousPage={i > 0 ? docs[i - 1] : undefined}
          nextPage={i < docs.length - 1 ? docs[i + 1] : undefined}
        />
      )
    );
  });
};

export default pages;
