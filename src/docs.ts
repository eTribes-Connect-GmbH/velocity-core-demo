import fs from 'node:fs/promises';
import path from 'node:path';

export type Doc = {
  title: string;
  section: string;
  href: string;
  doc: string;
};

export const docs: Doc[] = JSON.parse(await fs.readFile('./docs/docs.json', 'utf-8'));

export const getDocContent = async (doc: string) => {
  const fullPath = path.join('./docs', doc);
  return fs.readFile(fullPath, 'utf-8');
};
