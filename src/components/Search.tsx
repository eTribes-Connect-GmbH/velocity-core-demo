import Fuse, { FuseResult, FuseResultMatch, RangeTuple } from 'fuse.js';
import { useRequest } from '~/context';
import docs from '~/docs';
import { Doc } from '~/utils/loadDocs';

const fuse = new Fuse<Doc>(docs, {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'section', weight: 0.3 },
    { name: 'plainTextBody', weight: 0.5 }
  ],
  threshold: 0.3,
  includeMatches: true,
  ignoreLocation: true
});

const getLongestMatchRange = (matches: readonly FuseResultMatch[] | undefined, key: string) =>
  matches
    ?.find(match => match.key === key)
    ?.indices.reduce(
      (longest, current) => (current[1] - current[0] > longest[1] - longest[0] ? current : longest),
      [0, 0]
    );

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
    <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
  </svg>
);

const MatchHighlighter = ({ text, highlightRange }: { text: string; highlightRange?: RangeTuple }) => {
  if (!highlightRange) {
    return <span>{text.slice(0, 400)}</span>;
  }
  const matchStart = highlightRange[0];
  const matchEnd = highlightRange[1] + 1;
  const textStart = Math.max(0, matchStart - 50);
  const textEnd = Math.min(text.length, matchEnd + 350);
  return (
    <span>
      {textStart > 0 && '…'}
      {text.slice(textStart, matchStart)}
      <span className="bg-transparent text-sky-600 group-focus-within:underline group-hover:underline dark:text-sky-400">
        {text.slice(matchStart, matchEnd)}
      </span>
      {text.slice(matchEnd, textEnd)}
    </span>
  );
};

const SearchResult = ({ result }: { result: FuseResult<Doc> }) => (
  <a href={result.item.href} className="group outline-none">
    <li
      className="block rounded-lg px-3 py-2.5 group-focus-within:bg-slate-100 group-hover:bg-slate-100 dark:group-focus-within:bg-slate-700/30 dark:group-hover:bg-slate-700/30"
      aria-labelledby={`${result.refIndex}-section ${result.refIndex}-title`}
    >
      <div
        id={`${result.refIndex}-title`}
        aria-hidden="true"
        className="text-sm text-slate-700 group-focus-within:hover:text-sky-600 group-hover:text-sky-600 dark:text-slate-300 dark:group-focus-within:hover:text-sky-400 dark:group-hover:text-sky-400"
      >
        <MatchHighlighter text={result.item.title} highlightRange={getLongestMatchRange(result.matches, 'title')} />
      </div>
      <div id={`${result.refIndex}-section`} aria-hidden="true" className="text-xs text-slate-500 dark:text-slate-400">
        <MatchHighlighter text={result.item.section} highlightRange={getLongestMatchRange(result.matches, 'section')} />
      </div>
      <div
        id={`${result.refIndex}-text`}
        aria-hidden="true"
        className="mt-2 line-clamp-3 text-xs text-slate-500 dark:text-slate-400"
      >
        <MatchHighlighter
          text={result.item.plainTextBody}
          highlightRange={getLongestMatchRange(result.matches, 'plainTextBody')}
        />
      </div>
    </li>
  </a>
);

const SearchResults = ({ searchTerm, results }: { searchTerm: string; results: FuseResult<Doc>[] }) => {
  if (!results.length) {
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
        <SearchResult result={result} />
      ))}
    </ul>
  );
};

const SearchInput = ({ value }: { value: string }) => (
  <div className="group relative flex h-12 items-center">
    <SearchIcon class="pointer-events-none absolute left-4 top-0 h-full w-5 fill-slate-400 dark:fill-slate-500" />
    <x-instant-submitter debounceInMs="300" className="flex-auto">
      <input
        autoFocus
        type="search"
        name="q"
        value={value}
        className="w-full appearance-none bg-transparent pl-12 pr-4 text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
      />
    </x-instant-submitter>
  </div>
);

const SearchDialog = () => {
  const searchTerm = useRequest<{ Querystring: { q: string } }>().query.q;
  const results = searchTerm ? fuse.search(searchTerm, { limit: 4 }) : [];
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur" />
      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <div className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
          <x-modal-closer>
            <form method="GET" action="" data-turbo-action="replace">
              <SearchInput value={searchTerm} />
              <div className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800">
                {searchTerm && <SearchResults searchTerm={searchTerm} results={results} />}
              </div>
            </form>
          </x-modal-closer>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const userAgent = useRequest().headers['user-agent'] ?? '';
  const modifierKey = /(Mac|iPhone|iPod|iPad)/i.test(userAgent) ? '⌘' : 'Ctrl ';
  const searchTerm = useRequest<{ Querystring: { q?: string } }>().query.q;
  const isSearchOpen = searchTerm !== undefined;
  return (
    <>
      <x-shortcut-clicker shortcutKey="k" withModifierKey>
        <a href="?q=">
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
