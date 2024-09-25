import { component } from '../utilities/webComponents';

export class ActionEvent extends Event {
  public action: string | undefined;
  constructor(type: string, action?: string | null) {
    super(type, { bubbles: true });
    this.action = action ?? undefined;
  }
}

const Component = component('x-dispatch')<{ eventName: string; action?: 'open' | 'close' }>((self, attributes) => {
  const dispatch = () => {
    if (getComputedStyle(self).pointerEvents !== 'none') {
      self.dispatchEvent(new ActionEvent(attributes.eventName, attributes.action));
    }
  };
  const root = self.shadowRoot || self.attachShadow({ mode: 'open' });
  const trigger = document.createElement('SLOT');
  trigger.addEventListener('click', dispatch);
  root.append(trigger);
  return () => {
    window.removeEventListener('click', dispatch);
  };
});

declare global {
  namespace JSX {
    interface IntrinsicElements extends Id<typeof Component> {}
  }
}
