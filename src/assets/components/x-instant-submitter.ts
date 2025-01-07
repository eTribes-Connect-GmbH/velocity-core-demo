import { component } from '../utilities/webComponents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InstantSubmitter = component('x-instant-submitter')<{ debounceInMs: string }>((self, { debounceInMs }) => {
  const target = self.children[0] as HTMLInputElement | HTMLTextAreaElement;
  let timeoutId: number | undefined;
  const submit = () => target.form?.requestSubmit();
  const onInput = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(submit, parseInt(debounceInMs));
  };
  target.addEventListener('input', onInput);
  return () => target.removeEventListener('input', onInput);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof InstantSubmitter> {}
  }
}
