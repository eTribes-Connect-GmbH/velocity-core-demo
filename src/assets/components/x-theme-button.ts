import { visit } from '@hotwired/turbo';
import { component } from '../utilities/webComponents.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ThemeButton = component('x-theme-button')<{ theme: string }>((self, { theme }) => {
  const button = self.firstChild;
  const onClick = () => {
    document.cookie = `theme=${theme}; path=/`;
    visit(window.location.href, { action: 'replace' });
  };
  button?.addEventListener('click', onClick);
  return () => button?.removeEventListener('click', onClick);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof ThemeButton> {}
  }
}
