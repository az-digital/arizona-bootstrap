import fs from 'fs';
import path from 'path';

export function discoverPages(basePath: string = '_site'): string[] {
  const pages: string[] = [];

  function walkDir(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip certain directories
        if (['.', '..', 'node_modules', '.cache'].includes(file)) {
          continue;
        }
        walkDir(filePath);
      } else if (file === 'index.html') {
        // Convert file path to URL path
        const relativePath = path.relative(basePath, filePath);
        const urlPath = '/' + relativePath
          .replace(/\\/g, '/')
          .replace(/index\.html$/, '')
          .replace(/\/$/, '') || '/';

        pages.push(urlPath);
      }
    }
  }

  walkDir(basePath);
  return pages.sort();
}
