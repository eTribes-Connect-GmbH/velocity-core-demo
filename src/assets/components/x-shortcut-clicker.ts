import { component } from '../utilities/webComponents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShortcutClicker = component('x-shortcut-clicker')<{ shortcutKey: string }>((self, { shortcutKey }) => {
  const target = self.children[0] as HTMLAnchorElement | HTMLButtonElement;
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === shortcutKey && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      target.click();
    }
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof ShortcutClicker> {}
  }
}
