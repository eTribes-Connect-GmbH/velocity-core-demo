import { component } from '../utilities/webComponents';

const ClassToggle = component('x-class-toggle')<{ toggleClass: string }>((self, { toggleClass }) => {
  const buttons = self.querySelectorAll('[data-class-toggle-trigger]');
  const content = self.querySelector('[data-class-toggle-target]')!;
  const onClick = () => {
    if (content.classList.contains(toggleClass)) {
      content.classList.remove(toggleClass);
    } else {
      content.classList.add(toggleClass);
    }
  };
  buttons.forEach(button => button.addEventListener('click', onClick));
  return () => buttons.forEach(button => button.removeEventListener('click', onClick));
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface IntrinsicElements extends Id<typeof ClassToggle> {}
  }
}
