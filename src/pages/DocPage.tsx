import { unsafe } from '@nanoweb/jsx';
import DocsHeader from '~/components/DocsHeader';
import Layout from '~/components/Layout';
import PrevNextLinks, { PrevNextLinksProps } from '~/components/PrevNextLinks';
import TableOfContents from '~/components/TableOfContents';
import { Doc } from '~/utils/loadDocs';

const DocPage = async ({
  title,
  section,
  href,
  pageSections,
  htmlBody,
  previousPage,
  nextPage
}: Doc & PrevNextLinksProps) => {
  const isHomePage = href === '/';
  return (
    <Layout isHomePage={isHomePage} title={!isHomePage ? title : undefined}>
      <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <DocsHeader title={title} section={section} />
          <div
            className={[
              'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
              // headings
              'prose-headings:font-display prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
              // lead
              'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
              // links
              'prose-a:font-semibold dark:prose-a:text-velocity-700',
              // link underline
              'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.velocity.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
              // pre
              'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-white prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
              // hr
              'dark:prose-hr:border-slate-800'
            ]}
          >
            {unsafe(htmlBody)}
          </div>
        </article>
        <PrevNextLinks previousPage={previousPage} nextPage={nextPage} />
      </div>
      <TableOfContents pageSections={pageSections} />
    </Layout>
  );
};

export default DocPage;
