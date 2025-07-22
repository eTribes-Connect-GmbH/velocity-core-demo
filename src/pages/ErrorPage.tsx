import Layout from '~/components/Layout.js';

const ErrorPage = () => (
  <Layout title="Something went wrong">
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="font-display text-sm font-medium text-slate-900 dark:text-white">Error</p>
        <h1 className="font-display mt-3 text-3xl tracking-tight text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Unfortunately, an unexpected technical issue has occured. We apologize for the inconvenience.
        </p>
        <a href="/" className="mt-8 text-sm font-medium text-slate-900 dark:text-white">
          Go back home
        </a>
      </div>
    </div>
  </Layout>
);

export default ErrorPage;
