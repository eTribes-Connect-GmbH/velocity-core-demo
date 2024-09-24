import styles from 'bundle:client.entry.css';
import client from 'bundle:client.entry.js';
import favicon from '~/assets/favicon.ico';
import logo from '~/assets/logo.svg';
import { useRequest } from '~/context';
import useI18n, { LocaleAlternates, getLocaleAlternates } from '~/i18n';
import LocaleSelectorFlyout from './LocaleSelectorFlyout';
import DesktopSidebar from '~/components/DesktopSidebar';
import MobileSidebar from '~/components/MobileSidebar';

type LayoutProps = {
  title?: string;
  customLocaleAlternates?: LocaleAlternates;
  additionalScripts?: string[];
  children: JSX.Element;
};

const Layout = async ({ title, customLocaleAlternates, additionalScripts, children }: LayoutProps) => {
  const { locale, addLocalePrefix } = useI18n();
  const request = useRequest();
  const localeAlternates = customLocaleAlternates ?? getLocaleAlternates(request);
  return (
    <html lang={locale} class="h-full bg-white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="turbo-refresh-method" content="morph" />
        <meta name="turbo-refresh-scroll" content="preserve" />
        <title>{[title, 'Velocity Boilerplate'].filter(Boolean).join(' | ')}</title>
        <link rel="icon" href={favicon} />
        <link rel="stylesheet" href={styles} />
        {Object.entries(localeAlternates).map(([eachLocale, eachUrl]) => (
          <link rel="alternate" hrefLang={eachLocale} href={eachUrl} />
        ))}
        <script async type="module" src={client}></script>
        {additionalScripts?.map(script => <script async src={script}></script>)}
      </head>
      <body class="h-full min-h-screen bg-gradient-to-br from-white to-blue-200">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <x-dispatch eventName="sideBar">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span class="sr-only">Open sidebar</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </x-dispatch>
          <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <span class="relative flex flex-1"></span>
            <div class="flex items-center gap-x-4 lg:gap-x-6">
              <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

              <div class="relative">
                <LocaleSelectorFlyout localeAlternates={localeAlternates} />
              </div>
            </div>
          </div>
        </div>
        <MobileSidebar />
        <DesktopSidebar />
        <div class="m-auto max-w-screen-lg p-6 sm:p-10">
          <main class="py-10">
            <div class="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
