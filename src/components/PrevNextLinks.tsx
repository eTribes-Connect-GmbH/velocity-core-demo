const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
    <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
  </svg>
);

const PageLink = ({
  href,
  title,
  dir,
  className
}: {
  href: string;
  title: string;
  dir?: 'previous' | 'next';
  className?: string;
}) => (
  <div className={className}>
    <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
      {dir === 'previous' ? 'Previous' : 'Next'}
    </dt>
    <dd className="mt-1">
      <a
        href={href}
        className={[
          'flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
          dir === 'previous' && 'flex-row-reverse'
        ]}
      >
        {title}
        <ArrowIcon class={['h-4 w-4 flex-none fill-current', dir === 'previous' && '-scale-x-100']} />
      </a>
    </dd>
  </div>
);

export type PrevNextLinksProps = {
  previousPage?: { href: string; title: string };
  nextPage?: { href: string; title: string };
};

const PrevNextLinks = ({ previousPage, nextPage }: PrevNextLinksProps) => {
  if (!nextPage && !previousPage) {
    return null;
  }
  return (
    <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
      {previousPage && <PageLink dir="previous" {...previousPage} />}
      {nextPage && <PageLink className="ml-auto text-right" {...nextPage} />}
    </dl>
  );
};

export default PrevNextLinks;
