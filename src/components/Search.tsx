import { useRequest } from '~/context';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
    <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
  </svg>
);

const Search = () => {
  const userAgent = useRequest().headers['user-agent'] ?? '';
  const modifierKey = /(Mac|iPhone|iPod|iPad)/i.test(userAgent) ? '⌘' : 'Ctrl ';
  return (
    <x-google-cse cx="b7ef3b9b70b014d1f">
      <form>
        <div class="relative hidden md:block">
          <input
            name="searchTerm"
            className="peer w-80 rounded-lg py-2.5 pl-10 pr-12 text-sm placeholder-slate-500 outline-none ring-1 ring-slate-200 hover:ring-slate-300 lg:w-96 dark:bg-slate-800/75 dark:placeholder-slate-400 dark:ring-inset dark:ring-white/5 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500"
            placeholder="Search docs"
          />
          <SearchIcon class="absolute left-2.5 top-3 h-5 w-5 flex-none fill-slate-400 peer-hover:fill-slate-500 dark:fill-slate-500" />
          <kbd className="absolute right-2.5 top-2.5 font-medium text-slate-400 dark:text-slate-500">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </div>
      </form>
    </x-google-cse>
  );
};

export default Search;
