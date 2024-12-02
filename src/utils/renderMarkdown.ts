import hljs from 'highlight.js';
import { Lexer, Parser, Tokens, TokensList } from 'marked';

export type PageSection = {
  title: string;
  slug: string;
  subSections: { title: string; slug: string }[];
};

const getSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

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

const getCustomParser = () => {
  const parser = new Parser();
  parser.renderer.heading = ({ tokens, depth }) => {
    const text = Parser.parseInline(tokens);
    const slug = getSlug(text);
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  };
  parser.renderer.code = ({ text, lang }) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code className="language-${lang}">${hljs.highlight(text, { language: lang }).value}</code></pre>`;
    } else {
      return `<pre><code>${text}</code></pre>`;
    }
  };
  return parser;
};

const customParser = getCustomParser();

const renderMarkdown = (markdown: string) => {
  const tokens = Lexer.lex(markdown);
  return {
    pageSections: getPageSections(tokens),
    htmlBody: customParser.parse(tokens)
  };
};

export default renderMarkdown;
