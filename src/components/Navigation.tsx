import { useRequest } from '~/context';
import { docs } from '~/docs';

const navigation = docs.reduce<{ title: string; pages: { title: string; href: string }[] }[]>((acc, doc) => {
  const section = acc.find(eachSection => eachSection.title === doc.section);
  if (section) {
    section.pages.push({ title: doc.title, href: doc.href });
  } else {
    acc.push({ title: doc.section, pages: [{ title: doc.title, href: doc.href }] });
  }
  return acc;
}, []);

const Navigation = ({ className }: { className?: string }) => {
  const request = useRequest();
  const pathname = new URL(request.url, `http://${request.hostname}`).pathname;
  return (
    <nav className={['text-base lg:text-sm', className]}>
      <ul role="list" className="space-y-9">
        {navigation.map(section => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">{section.title}</h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            >
              {section.pages.map(page => (
                <li key={page.href} className="relative">
                  <a
                    href={page.href}
                    className={[
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                      page.href === pathname
                        ? 'text-velocity-700 before:bg-velocity-700 font-semibold'
                        : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                    ]}
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
