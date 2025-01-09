import { Lexer } from 'marked';
import renderToPlainText from './renderToPlainText';
import getPageSections from './getPageSections';
import renderToHtml from './renderToHtml';

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
