import fs from 'fs';
import path from 'path';

// Walks a built Hugo site (`_site` by default) and returns the URL path for
// every rendered page, derived from the `index.html` files Hugo wrote. Since
// `publishDir` layout mirrors page permalinks regardless of `baseURL`, these
// paths are appended as-is to whichever site (before/after) is being
// screenshotted.
export function discoverPages(basePath: string = '_site'): string[] {
  const pages: string[] = [];

  function walkDir(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file === 'index.html') {
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
