import { visit } from '@hotwired/turbo';
import { component } from '../utilities/webComponents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModalCloser = component('x-modal-closer')(self => {
  const target = self.children[0];
  const closeModal = () => {
    visit(window.location.pathname);
  };
  const onClickOutside = (event: MouseEvent) => {
    if (!target.contains(event.target as Node)) {
      closeModal();
    }
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };
  document.addEventListener('click', onClickOutside);
  window.addEventListener('keydown', onKeyDown);
  return () => {
    document.removeEventListener('click', onClickOutside);
    window.removeEventListener('keydown', onKeyDown);
  };
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof ModalCloser> {}
  }
}
