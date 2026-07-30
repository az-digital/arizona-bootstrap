import { defineConfig, devices } from '@playwright/test';

// Dedicated visual-regression port so VR runs coexist with the review-site
// container (scripts/build-container.sh), which holds port 9001. Override with
// the VR_PORT environment variable if 9002 is also taken.
const PORT = Number(process.env.VR_PORT ?? 9002);
const baseURL = `http://localhost:${PORT}`;

// The containerized branch-to-branch runner (scripts/vr-test.sh) points every
// run at one shared baseline directory so the base and current branches compare
// against the same images. When unset (a direct local run), Playwright's
// default per-test-file snapshots directory is used.
const snapshotDir = process.env.VR_SNAPSHOT_DIR;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  snapshotPathTemplate: snapshotDir
    ? `${snapshotDir}/{arg}{-projectName}{-platform}{ext}`
    : undefined,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // Run hugo directly (via hugo-bin) rather than the npm `docs-serve` script,
    // which hardcodes port 9001. Playwright starts this server before the run
    // and shuts it down afterwards, so nothing lingers.
    command: `npx --no-install hugo server --port ${PORT} --disableFastRender`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
