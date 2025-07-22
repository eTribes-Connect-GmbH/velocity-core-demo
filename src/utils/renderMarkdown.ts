import { Lexer } from 'marked';
import renderToPlainText from './renderToPlainText.js';
import getPageSections from './getPageSections.js';
import renderToHtml from './renderToHtml.js';

const renderMarkdown = (markdown: string) => {
  const lexer = new Lexer();
  const tokens = lexer.lex(markdown);
  return {
    pageSections: getPageSections(tokens),
    htmlBody: renderToHtml(tokens),
    plainTextBody: renderToPlainText(tokens)
  };
};

export default renderMarkdown;
