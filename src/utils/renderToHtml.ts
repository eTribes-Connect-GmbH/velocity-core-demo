import hljs from 'highlight.js';
import { Parser, Renderer, Tokens, TokensList } from 'marked';
import getSlug from './getSlug';

class HtmlRenderer extends Renderer {
  public heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    const slug = getSlug(text);
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  }
  public code({ text, lang }: Tokens.Code): string {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code className="language-${lang}">${hljs.highlight(text, { language: lang }).value}</code></pre>`;
    } else {
      return `<pre><code>${text}</code></pre>`;
    }
  }
}

const renderToHtml = (tokens: TokensList) => {
  const htmlParser = new Parser({ renderer: new HtmlRenderer() });
  return htmlParser.parse(tokens);
};

export default renderToHtml;
