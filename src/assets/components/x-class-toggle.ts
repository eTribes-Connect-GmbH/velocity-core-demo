import { component } from '../utilities/webComponents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ClassToggle = component('x-class-toggle')<{ toggleClass: string }>((self, { toggleClass }) => {
  const triggers = self.querySelectorAll('[data-class-toggle-trigger]');
  const target = self.querySelector('[data-class-toggle-target]')!;
  const onClick = () => {
    if (target.classList.contains(toggleClass)) {
      target.classList.remove(toggleClass);
    } else {
      target.classList.add(toggleClass);
    }
  };
  triggers.forEach(button => button.addEventListener('click', onClick));
  return () => triggers.forEach(button => button.removeEventListener('click', onClick));
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof ClassToggle> {}
  }
}
