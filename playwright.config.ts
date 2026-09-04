import { defineConfig, devices } from '@playwright/test';

// Visual regression between two already-deployed sites (e.g. a review site
// for a PR branch vs. the main review site). Page discovery and navigation
// target live URLs, so there is no local webServer to manage here - see
// tests/global-setup.ts and tests/visual-regression.spec.ts.
export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // Pages with JS-driven motion (carousels, etc.) or that are just heavy over
  // the network take longer than the 5s default to settle into a stable
  // screenshot.
  expect: {
    timeout: 20000,
  },
  // Both the seed ("before") and compare ("after") passes run as separate
  // `playwright test` invocations and must resolve to the same snapshot
  // files, so the template omits the project/platform segments Playwright
  // would otherwise add. This directory must live outside `outputDir`
  // (test-results/ by default) - Playwright wipes outputDir at the start of
  // every run, which would delete the "before" baselines before the "after"
  // pass ever saw them.
  snapshotPathTemplate: '.vr-baselines/{arg}{ext}',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
