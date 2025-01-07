import { component } from '../utilities/webComponents';

const waitForGlobalVar = (name: string) =>
  new Promise(resolve => {
    const interval = setInterval(() => {
      if ((window as any)[name]) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 50);
  });

const mountScript = (url: string, expectedGlobalVarName: string) =>
  new Promise<void>(resolve => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        (async () => {
          await waitForGlobalVar(expectedGlobalVarName);
          resolve();
        })();
      });
    }
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleCse = component('x-google-cse')<{ cx: string }>(async (self, { cx }) => {
  const searchForm = self.children[0];
  const searchInput = searchForm.querySelector<HTMLInputElement>('input[name="searchTerm"]')!;
  let searchResults: HTMLDivElement | undefined;
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    (async () => {
      if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.classList.add('gcse-searchresults-only');
        document.body.children[0].appendChild(searchResults);
      }
      await mountScript(`https://cse.google.com/cse.js?cx=${cx}`, 'google');
      window.google.search.cse.element.getElement('searchresults-only0').execute(searchInput.value);
    })();
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    google: { search: { cse: { element: { getElement: (id: string) => { execute: (query: string) => void } } } } };
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends Id<typeof GoogleCse> {}
  }
}
