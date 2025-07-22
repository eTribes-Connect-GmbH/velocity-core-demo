import { PageSection } from '~/utils/getPageSections.js';

const TableOfContents = ({ pageSections }: { pageSections: PageSection[] }) => (
  <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
    <nav aria-labelledby="on-this-page-title" className="w-56">
      {pageSections.length > 0 && (
        <>
          <h2 id="on-this-page-title" className="font-display text-sm font-medium text-slate-900 dark:text-white">
            On this page
          </h2>
          <x-table-of-contents-highlighter toggleClass="!text-velocity-700">
            <ol role="list" className="mt-4 space-y-3 text-sm">
              {pageSections.map(section => (
                <li key={section.slug}>
                  <h3>
                    <a
                      href={`#${section.slug}`}
                      className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {section.title}
                    </a>
                  </h3>
                  {section.subSections.length > 0 && (
                    <ol role="list" className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                      {section.subSections.map(subSection => (
                        <li key={subSection.slug}>
                          <a href={`#${subSection.slug}`} className="hover:text-slate-600 dark:hover:text-slate-300">
                            {subSection.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </x-table-of-contents-highlighter>
        </>
      )}
    </nav>
  </div>
);

export default TableOfContents;
