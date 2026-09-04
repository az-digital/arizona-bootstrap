import fs from 'fs';
import path from 'path';
import { discoverPages } from './utils/discover-pages';

// Runs once before either the "before" or "after" pass (see
// visual-regression.spec.ts) and writes the page list both passes will share,
// so the same set of pages is screenshotted on each side of the comparison.
export default async function globalSetup() {
  const siteDir = process.env.VR_SITE_DIR ?? '_site';

  if (!fs.existsSync(siteDir)) {
    throw new Error(
      `Hugo build output not found at '${siteDir}'. Run 'npm run dist && npm run docs-serve-config && npm run docs-build' first.`,
    );
  }

  const pages = discoverPages(siteDir);

  if (pages.length === 0) {
    throw new Error(`No pages were found under '${siteDir}'.`);
  }

  fs.writeFileSync(path.join(__dirname, '.vr-pages.json'), JSON.stringify(pages));
}
