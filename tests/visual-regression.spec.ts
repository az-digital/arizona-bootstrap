import { test, expect } from '@playwright/test';
import { discoverPages } from './utils/discover-pages';

const pages = discoverPages();

test.describe('Visual Regression - Arizona Bootstrap', () => {
  test.describe.configure({ timeout: 30000 });

  pages.forEach((page) => {
    test(`screenshot: ${page || '/'}`, async ({ page: browserPage }) => {
      const url = page || '/';

      const response = await browserPage.goto(url, { waitUntil: 'networkidle' });
      if (response?.status() === 404) {
        test.skip();
        return;
      }

      await browserPage.waitForTimeout(500);

      await expect(browserPage).toHaveScreenshot(`${url.replace(/\//g, '-').replace(/^-/, '') || 'index'}.png`, {
        maxDiffPixels: 100,
      });
    });
  });
});
