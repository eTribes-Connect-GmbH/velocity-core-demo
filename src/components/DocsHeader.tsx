const DocsHeader = ({ section, title }: { section?: string; title?: string }) => (
  <header className="mb-9 space-y-1">
    {section && <p className="font-display text-sm font-medium text-velocity-700">{section}</p>}
    {title && <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">{title}</h1>}
  </header>
);

export default DocsHeader;
