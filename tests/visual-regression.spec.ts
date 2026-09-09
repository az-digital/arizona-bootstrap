import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Compares the same set of pages (discovered from a local Hugo build by
// global-setup.ts) rendered on two different, already-deployed sites - a
// "before" baseline and an "after" candidate. Driven by
// scripts/vr-url-test.sh, which runs this spec twice: once against
// VR_BEFORE_URL with --update-snapshots to seed the baseline, then again
// against VR_AFTER_URL to compare.
const BEFORE_URL = process.env.VR_BEFORE_URL;
const AFTER_URL = process.env.VR_AFTER_URL;
const PASS = process.env.VR_PASS;

if (!BEFORE_URL || !AFTER_URL) {
  throw new Error('Set VR_BEFORE_URL and VR_AFTER_URL before running the visual regression tests.');
}
if (PASS !== 'before' && PASS !== 'after') {
  throw new Error("Set VR_PASS to 'before' or 'after' before running the visual regression tests.");
}

const targetBase = (PASS === 'before' ? BEFORE_URL : AFTER_URL).replace(/\/$/, '');
const pages: string[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.vr-pages.json'), 'utf-8'),
);

test.describe(`Visual regression (${PASS}: ${targetBase})`, () => {
  test.describe.configure({ timeout: 45000 });

  for (const pagePath of pages) {
    test(`screenshot: ${pagePath}`, async ({ page }) => {
      const response = await page.goto(`${targetBase}${pagePath}`, { waitUntil: 'networkidle' });
      if (!response || response.status() === 404) {
        test.skip();
        return;
      }

      await page.waitForTimeout(500);

      const snapshotName = `${pagePath.replace(/\//g, '-').replace(/^-/, '') || 'index'}.png`;
      await expect(page).toHaveScreenshot(snapshotName, {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  }
});
