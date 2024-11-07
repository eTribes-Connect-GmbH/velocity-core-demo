import matter from 'gray-matter';
import fs from 'node:fs/promises';
import renderMarkdown, { PageSection } from './renderMarkdown';

export type Doc = {
  title: string;
  section: string;
  href: string;
  pageSections: PageSection[];
  htmlBody: string;
};

const loadDocs = async (): Promise<Doc[]> =>
  (
    await Promise.all(
      (await fs.readdir('./docs', { withFileTypes: true }))
        .filter(item => item.isDirectory())
        .map(async (dir, dirIndex) => {
          const sectionSlug = dir.name.replace(/^\d{2}-(.+)$/, '$1');
          const files = await fs.readdir(`./docs/${dir.name}`, { withFileTypes: true });
          return Promise.all(
            files
              .filter(item => item.name.endsWith('.md'))
              .map(async (file, fileIndex) => {
                const fileContent = await fs.readFile(`./docs/${dir.name}/${file.name}`, 'utf-8');
                const { data, content } = matter(fileContent);
                const { pageSections, htmlBody } = renderMarkdown(content);
                const slug = file.name.replace(/^\d{2}-(.+)\.md$/, '$1');
                return {
                  title: data.title,
                  section: data.section,
                  href: dirIndex === 0 && fileIndex === 0 ? '/' : `/${sectionSlug}/${slug}`,
                  pageSections,
                  htmlBody
                };
              })
          );
        })
    )
  ).flat();

export default loadDocs;
