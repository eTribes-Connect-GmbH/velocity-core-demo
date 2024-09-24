import { component } from '../utilities/webComponents';
import { ActionEvent } from './x-dispatch';
import { applyAnimation } from '../utilities/animations';

type TransitionAttributes = {
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
};

type ToggleAttributes = Partial<TransitionAttributes> & {
  triggerEvent: string;
  openOnMount?: boolean;
  closeOnBlur?: boolean;
  persistent?: boolean;
  autoClose?: number;
  preventScroll?: boolean;
};

const persistentState = new Set<string>();

const Toggle = component('x-toggle')<ToggleAttributes>((self, attributes) => {
  const root: ShadowRoot = self.shadowRoot ?? self.attachShadow({ mode: 'open' });
  const persistentContainer = document.createElement('SLOT');
  persistentContainer.setAttribute('name', 'persistent');
  const defaultContainer = document.createElement('SLOT');
  defaultContainer.setAttribute('name', 'default');
  const toggleContainer = document.createElement('SLOT');
  self.tabIndex = -1;
  let timer: NodeJS.Timer | undefined;

  const isOpen = () => root.contains(toggleContainer);
  const handleEvent = (event: Event) => {
    clearTimeout(timer as unknown as number);
    if (event instanceof ActionEvent && ['open', 'close'].includes(event.action!)) {
      event.action === 'close' ? close() : open();
    } else {
      isOpen() ? close() : open();
    }
  };

  const handleBodyClick = (event: Event) => {
    const node = event.target as Element;
    if (!node.closest(`x-dispatch[eventName="${attributes.triggerEvent}"]`)) {
      !self.contains(node) && close();
    }
  };

  const open = async () => {
    defaultContainer.remove();
    if (attributes.persistent) {
      persistentState.add(attributes.triggerEvent);
    }
    if ((self.firstChild as HTMLElement).tagName === 'TEMPLATE') {
      const template = self.firstChild as HTMLTemplateElement;
      self.prepend(...template.content.children);
      template.remove();
    }
    root.append(toggleContainer);
    self.focus({ preventScroll: attributes.preventScroll === 'true' });
    if (attributes.preventScroll) {
      document.body.classList.add('overflow-hidden');
    }
    self.dispatchEvent(new Event('open-container'));
    await applyAnimation(self, 'enter');
    if (attributes.closeOnBlur) {
      window.addEventListener('focusin', handleBodyClick);
      setTimeout(() => {
        window.addEventListener('click', handleBodyClick);
      }, 0);
    }
    if (attributes.autoClose) {
      timer = setTimeout(close, Number(attributes.autoClose));
    }
  };

  const close = async () => {
    self.dispatchEvent(new Event('close-container'));
    persistentState.delete(attributes.triggerEvent);
    await applyAnimation(self, 'leave');
    toggleContainer.remove();
    root.append(defaultContainer);
    if (attributes.preventScroll) {
      document.body.classList.remove('overflow-hidden');
    }
    window.removeEventListener('click', handleBodyClick);
    window.removeEventListener('focusin', handleBodyClick);
  };
  window.addEventListener(attributes.triggerEvent, handleEvent);
  root.append(persistentContainer);
  root.append(defaultContainer);
  if (attributes.openOnMount ?? (attributes.persistent && persistentState.has(attributes.triggerEvent))) {
    open();
  }
  return () => {
    window.removeEventListener(attributes.triggerEvent, handleEvent);
  };
});

const Transition = component('x-child-transition')<TransitionAttributes>(self => {
  const toggleElement = self.closest('x-toggle');
  toggleElement?.addEventListener('open-container', () => applyAnimation(self, 'enter'));
  toggleElement?.addEventListener('close-container', () => applyAnimation(self, 'leave'));
  applyAnimation(self, 'leave');
});

declare global {
  namespace JSX {
    interface IntrinsicElements extends Id<typeof Toggle> {}
    interface IntrinsicElements extends Id<typeof Transition> {}
  }
}
