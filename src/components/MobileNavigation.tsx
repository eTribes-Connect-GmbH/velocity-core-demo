import { Logomark } from './Logo';
import Navigation from './Navigation';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
    <path d="M5 5l14 14M19 5l-14 14" />
  </svg>
);

const MobileNavigation = () => (
  <x-class-toggle toggleClass="hidden">
    <div className="flex">
      <button type="button" className="relative" aria-label="Open navigation" data-class-toggle-trigger>
        <MenuIcon class="h-6 w-6 stroke-slate-500" />
      </button>
      <div className="hidden" data-class-toggle-target>
        <div
          className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
          aria-label="Navigation"
        >
          <div className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 sm:px-6 dark:bg-slate-900">
            <div className="flex items-center">
              <button type="button" aria-label="Close navigation" data-class-toggle-trigger>
                <CloseIcon class="h-6 w-6 stroke-slate-500" />
              </button>
              <a href="/" className="ml-6" aria-label="Home page">
                <Logomark class="h-9 w-9" />
              </a>
            </div>
            <Navigation className="mt-5 px-1" />
          </div>
        </div>
      </div>
    </div>
  </x-class-toggle>
);

export default MobileNavigation;
