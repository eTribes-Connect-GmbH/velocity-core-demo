import { component } from '../utilities/webComponents';

const Toggle = component('x-toggle')(self => {
  const buttons = self.querySelectorAll('[data-toggle-button]');
  const content = self.querySelector('[data-toggle-content]')!;
  const toggleContent = () => {
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  };
  buttons.forEach(button => button.addEventListener('click', toggleContent));
  return () => buttons.forEach(button => button.removeEventListener('click', toggleContent));
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface IntrinsicElements extends Id<typeof Toggle> {}
  }
}
