import { Tokens, TokensList } from 'marked';
import getSlug from './getSlug.js';

export type PageSection = {
  title: string;
  slug: string;
  subSections: { title: string; slug: string }[];
};

const getPageSections = (tokens: TokensList) =>
  (tokens.filter(({ type }) => type === 'heading') as Tokens.Heading[]).reduce<PageSection[]>(
    (acc, { depth, text }) => {
      const section = { title: text, slug: getSlug(text), subSections: [] };
      if (depth === 2) {
        acc.push(section);
      } else if (depth === 3) {
        const currentSection = acc[acc.length - 1] as PageSection | undefined;
        if (currentSection) {
          currentSection.subSections.push(section);
        }
      }
      return acc;
    },
    []
  );

export default getPageSections;
