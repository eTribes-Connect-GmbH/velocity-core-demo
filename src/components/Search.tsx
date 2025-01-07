import Fuse from 'fuse.js';
import { useRequest } from '~/context';
import docs from '~/docs';

const fuse = new Fuse(docs);

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
    <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
  </svg>
);

const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <circle cx="10" cy="10" r="5.5" strokeLinejoin="round" />
    <path stroke="url(#loading)" strokeLinecap="round" strokeLinejoin="round" d="M15.5 10a5.5 5.5 0 1 0-5.5 5.5" />
    <defs>
      <linearGradient id="loading" x1="13" x2="9.5" y1="9" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="currentColor" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

type Result = {
  id: string;
  url: string;
  title: string;
};

const SearchResult = ({ searchTerm, result }: { searchTerm: string; result: Result }) => {
  // let sectionTitle = navigation.find(section =>
  //   section.links.find(link => link.href === result.url.split('#')[0])
  // )?.title;
  // let hierarchy = [sectionTitle, result.pageTitle].filter((x): x is string => typeof x === 'string');
  const bla = 'hi';
  return (
    <li
      className="group block cursor-default rounded-lg px-3 py-2 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-700/30"
      aria-labelledby={`${result.id}-hierarchy ${result.id}-title`}
    >
      <div
        id={`${result.id}-title`}
        aria-hidden="true"
        className="text-sm text-slate-700 group-aria-selected:text-sky-600 dark:text-slate-300 dark:group-aria-selected:text-sky-400"
      >
        {result.title}
        <span className="bg-transparent text-sky-600 group-aria-selected:underline dark:text-sky-400">
          {searchTerm}
        </span>
      </div>
      {/* {hierarchy.length > 0 && (
        <div
          id={`${result.id}-hierarchy`}
          aria-hidden="true"
          className="mt-0.5 truncate whitespace-nowrap text-xs text-slate-500 dark:text-slate-400"
        >
          {hierarchy.map((item, itemIndex, items) => (
            <Fragment key={itemIndex}>
              <HighlightQuery text={item} query={query} />
              <span className={itemIndex === items.length - 1 ? 'sr-only' : 'mx-2 text-slate-300 dark:text-slate-700'}>
                /
              </span>
            </Fragment>
          ))}
        </div>
      )} */}
    </li>
  );
};

const SearchResults = ({ searchTerm, results }: { searchTerm: string; results: any[] }) => {
  if (results.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-slate-700 dark:text-slate-400">
        No results for &ldquo;
        <span className="break-words text-slate-900 dark:text-white">{searchTerm}</span>
        &rdquo;
      </p>
    );
  }

  return (
    <ul>
      {results.map(result => (
        <SearchResult searchTerm={searchTerm} result={result} />
      ))}
    </ul>
  );
};

const SearchInput = ({ value }: { value: string }) => {
  const status = 'ready' as 'ready' | 'stalled';
  return (
    <div className="group relative flex h-12 items-center">
      <SearchIcon class="pointer-events-none absolute left-4 top-0 h-full w-5 fill-slate-400 dark:fill-slate-500" />
      <x-instant-submitter debounceInMs="300" className="flex-auto">
        <input
          autoFocus
          type="search"
          name="q"
          id="search-input"
          data-turbo-permanent
          value={value}
          className={[
            'flex-auto appearance-none bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
            status === 'stalled' ? 'pr-11' : 'pr-4'
          ]}
        />
      </x-instant-submitter>
      {status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon class="h-6 w-6 animate-spin stroke-slate-200 text-slate-400 dark:stroke-slate-700 dark:text-slate-500" />
        </div>
      )}
    </div>
  );
};

const SearchDialog = () => {
  const searchTerm = useRequest<{ Querystring: { q: string } }>().query.q;
  const results = [
    {
      id: '1',
      url: '/docs/02-core-concepts/02-context',
      title: 'Context'
    },
    {
      id: '2',
      url: '/docs/02-core-concepts/03-client-side-interactivity',
      title: 'Client Side Interactivity'
    }
  ];
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur" />
      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <div className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
          <div>
            <form method="GET" action="">
              <input type="hidden" name="isSearchOpen" value="true" />
              <SearchInput value={searchTerm} />
              <div className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800">
                <SearchResults searchTerm={searchTerm} results={results} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const userAgent = useRequest().headers['user-agent'] ?? '';
  const modifierKey = /(Mac|iPhone|iPod|iPad)/i.test(userAgent) ? '⌘' : 'Ctrl ';
  const isSearchOpen = useRequest<{ Querystring: { isSearchOpen: string } }>().query.isSearchOpen === 'true';
  return (
    <>
      <x-shortcut-clicker shortcutKey="k">
        <a href="?isSearchOpen=true">
          <button
            type="button"
            className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500"
          >
            <SearchIcon class="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 md:group-hover:fill-slate-400 dark:fill-slate-500" />
            <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">Search docs</span>
            <kbd className="ml-auto hidden font-medium text-slate-400 md:block dark:text-slate-500">
              <kbd className="font-sans">{modifierKey}</kbd>
              <kbd className="font-sans">K</kbd>
            </kbd>
          </button>
        </a>
      </x-shortcut-clicker>
      {isSearchOpen && <SearchDialog />}
    </>
  );
};

export default Search;
