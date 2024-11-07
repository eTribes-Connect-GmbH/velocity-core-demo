import { component } from '../utilities/webComponents';

const TableOfContentsHighlighter = component('x-table-of-contents-highlighter')<{ toggleClass: string }>((
  self,
  { toggleClass }
) => {
  const pageSections = Array.from(self.querySelectorAll('a')).map(anchorElement => {
    const id = anchorElement.getAttribute('href')?.replace(/^#(.*)/, '$1') ?? '';
    const position = (document.getElementById(id)?.getBoundingClientRect().top ?? 0) - 150;
    return { position, anchorElement };
  });
  const onScroll = () => {
    pageSections.forEach(({ position, anchorElement }, index) => {
      const scollPosition = window.scrollY;
      if (scollPosition >= position && (!pageSections[index + 1] || scollPosition < pageSections[index + 1].position)) {
        anchorElement.classList.add(toggleClass);
      } else {
        anchorElement.classList.remove(toggleClass);
      }
    });
  };
  window.addEventListener('scroll', onScroll, true);
  return window.removeEventListener('scroll', onScroll);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface IntrinsicElements extends Id<typeof TableOfContentsHighlighter> {}
  }
}
