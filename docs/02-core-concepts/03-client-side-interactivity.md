---
title: Client-Side Interactivity
section: Core Concepts
---

Velocity Core leverages the **Islands Architecture** to minimize the amount of JavaScript code sent to the client. This reduces initial load times especially on low bandwidth connections. With Velocity Core, developers are encouraged to handle as much logic as possible server-side or through semantic HTML elements (like `<details>`) and native CSS features (like `:hover`), limiting the use of client-side JavaScript to only what is absolutely necessary. When JavaScript is required, Velocity Core promotes the use of **Web Components** for encapsulated, reusable, and highly performant client-side interactions.

## Creating a Web Component

Velocity Core provides a simple utility that makes writing Web Components less verbose. The `component` helper (in `src/assets/utilities/webComponents.ts`) enables you to create Web Components with minimal setup and clear, maintainable code.

Here's an example of how to create a simple Web Component using the `component` helper:

```ts
import { component } from '../utilities/webComponents.js';

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
```

- **`component('x-class-toggle')`**: This function call creates a new custom element with the tag name `x-class-toggle`.
- **`<{ toggleClass: string }>`**: This type argument defines the expected properties that the component can receive. In this case, `toggleClass` is a string that specifies the class to toggle on the target element.
- **The callback function**: This function is executed when the component is initialized. It receives `self` (the custom element) and `props` (the properties passed to the component) as arguments.
- **Event Handling**: Inside the callback function, event listeners are added to the triggers to handle the toggle functionality, and a cleanup function is returned to remove those event listeners when the component is unmounted.

### Adding Type Declarations

To ensure excellent TypeScript support when using your custom Web Component in JSX, include the following declaration at the bottom of your component file:

```ts
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof ClassToggle> {}
  }
}
```

This step adds type definitions that allow your custom component to be recognized within JSX, giving you full type safety and autocompletion in your editor.

### Registering Your Component

For your component to be included in the client-side JavaScript bundle, you need to import it at the top of the `src/assets/client.entry.ts` file:

```ts
import './components/x-class-toggle.js';
```

### Using Your Web Component in JSX

You can then use your Web Component in your server-rendered JSX components like so:

```tsx
const SimpleToggle = () => (
  <x-class-toggle toggleClass="hidden">
    <button data-class-toggle-trigger>Toggle Content</button>
    <div className="hidden" data-class-toggle-target>
      This content is toggled.
    </div>
  </x-class-toggle>
);
```

## CSS-Only Interactivity

For simple UI state, sometimes it’s enough to use HTML and CSS, e.g. using a hidden checkbox. With Tailwind’s `peer` and `peer-checked`, you can build a no-JS toggle like this:

```tsx
const SimpleToggle = () => (
  <div>
    <input type="checkbox" id="toggle" class="peer hidden" />
    <label for="toggle">Toggle Content</label>
    <div class="hidden peer-checked:block">This content is toggled.</div>
  </div>
);
```
