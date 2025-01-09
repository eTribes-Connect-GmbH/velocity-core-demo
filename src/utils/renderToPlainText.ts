import { Parser, Renderer, Tokens, TokensList } from 'marked';

class PlainTextRenderer extends Renderer {
  // Inline-level renderer methods
  public strong(token: Tokens.Strong): string {
    return this.parser.parseInline(token.tokens);
  }
  public em(token: Tokens.Em): string {
    return this.parser.parseInline(token.tokens);
  }
  public codespan(token: Tokens.Codespan): string {
    return token.text.replace(/\s+/g, ' ');
  }
  public br(): string {
    return ' ';
  }
  public del(token: Tokens.Del): string {
    return this.parser.parseInline(token.tokens);
  }
  public link(token: Tokens.Link): string {
    return this.parser.parseInline(token.tokens);
  }
  public image(): string {
    return '';
  }
  text(token: Tokens.Text | Tokens.Escape): string {
    return 'tokens' in token && token.tokens ? this.parser.parseInline(token.tokens) : token.text.replace(/\s+/g, ' ');
  }

  // Block-level renderer methods
  public space(): string {
    return ' ';
  }
  public code(token: Tokens.Code): string {
    return token.text.replace(/\s+/g, ' ') + ' ';
  }
  public blockquote(token: Tokens.Blockquote): string {
    return this.parser.parseInline(token.tokens) + ' ';
  }
  public html(): string {
    return '';
  }
  public heading(token: Tokens.Heading): string {
    return this.parser.parseInline(token.tokens) + ' ';
  }
  public hr(): string {
    return ' ';
  }
  public list(token: Tokens.List): string {
    const items = token.items.map(item => this.listitem(item)).join(' ');
    return items + ' ';
  }
  public listitem(item: Tokens.ListItem): string {
    return this.parser.parse(item.tokens) + ' ';
  }
  public paragraph(token: Tokens.Paragraph): string {
    return this.parser.parseInline(token.tokens) + ' ';
  }
  public table(token: Tokens.Table): string {
    const header = token.header.map(cell => this.parser.parse(cell.tokens)).join(' ');
    const rows = token.rows.map(row => row.map(cell => this.parser.parse(cell.tokens)).join(' ')).join(' ');
    return header + ' ' + rows + ' ';
  }
  public tablerow(token: Tokens.TableRow): string {
    return token.text.replace(/\s+/g, ' ') + ' ';
  }
  public tablecell(token: Tokens.TableCell): string {
    return this.parser.parse(token.tokens) + ' ';
  }
}

const renderToPlainText = (tokens: TokensList) => {
  const plainTextParser = new Parser({ renderer: new PlainTextRenderer() });
  return plainTextParser.parse(tokens);
};

export default renderToPlainText;
