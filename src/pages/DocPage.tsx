import { unsafe } from '@nanoweb/jsx';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import DocsHeader from '~/components/DocsHeader';
import Layout from '~/components/Layout';
import PrevNextLinks, { PrevNextLinksProps } from '~/components/PrevNextLinks';
import { Doc, getDocContent } from '~/docs';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'language-',
  highlight: (code, language) => {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    } else {
      return '';
    }
  }
}).use(markdownItAnchor, { tabIndex: false });

const DocPage = async ({ title, section, href, doc, previousPage, nextPage }: Doc & PrevNextLinksProps) => {
  const docContent = await getDocContent(doc);
  return (
    <Layout isHomePage={href === '/'}>
      <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <DocsHeader title={title} section={section} />
          <div
            className={[
              'prose prose-slate dark:prose-invert max-w-none dark:text-slate-400',
              // headings
              'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
              // lead
              'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
              // links
              'prose-a:font-semibold dark:prose-a:text-velocity-700',
              // link underline
              'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.velocity.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)]',
              // pre
              'prose-pre:rounded-xl prose-pre:text-white prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
              // hr
              'dark:prose-hr:border-slate-800'
            ]}
          >
            {unsafe(md.render(docContent))}
          </div>
        </article>
        <PrevNextLinks previousPage={previousPage} nextPage={nextPage} />
      </div>
      {/* <TableOfContents tableOfContents={tableOfContents} /> */}
    </Layout>
  );
};

export default DocPage;
