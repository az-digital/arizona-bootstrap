# Visual Regression Tests

This directory contains visual regression (VR) tests using Playwright for
Arizona Bootstrap. They screenshot every page of the built docs site and
compare those screenshots against baseline images to catch unintended visual
changes.

## Requirements

- **Node.js >= 20** on the host (see `engines` in `package.json`). macOS
  Homebrew's default `node` may still be v18, which fails the build partway
  through — the VR scripts detect this and exit early with instructions. Activate
  a newer Node first, for example:

  ```bash
  nvm use 22
  # or, with a Homebrew keg:
  export PATH="$(brew --prefix)/opt/node@22/bin:$PATH"
  ```

- The host Node toolchain installed (`npm install`). VR runs on the host using
  the bundled `hugo-bin`, independent of the Docker review-site workflow.
- Playwright's Chromium browser. The scripts install it automatically, or you
  can run `npx playwright install chromium` once yourself.

> **macOS note:** if `hugo-bin`'s binary was vendored from the Docker/Linux
> workflow, `docs-build` may fail with `spawn ENOEXEC` (it's a Linux binary).
> Re-fetch the correct one for your platform with:
>
> ```bash
> node node_modules/hugo-bin/lib/install.js
> ```


## Port and container coexistence

VR serves the docs on **port 9002** (override with the `VR_PORT` environment
variable). This is deliberately different from the review-site container
(`scripts/build-container.sh`), which holds port **9001**, so the same-branch
commands below can run in a second terminal while the container is up.
Playwright starts its own server for the duration of a run and shuts it down
afterwards.

## Baselines are not committed

Baseline screenshots are **gitignored** (they are OS/browser specific and
churny). Each developer generates them locally. On a fresh clone there are no
baselines yet, so the first thing to do is create them — either from your
current branch (`test:visual:update`) or, more usefully, from `main`
(`test:visual:main`).

## Commands

### Compare your branch against `main` (recommended)

```bash
npm run test:visual:main
```

One self-contained command: it seeds baselines from `main`, returns to your
branch, rebuilds, and compares. Stop the review-site container first — this
command switches branches and will **abort** if port 9001 is in use.

### Create/refresh baselines for the current branch

```bash
npm run test:visual:update
```

Crawls all pages in `_site/` and writes baseline screenshots into
`tests/visual-regression.spec.ts-snapshots/`.

### Compare the current branch against existing baselines

```bash
npm run test:visual
```

Faster, does no branch switching, and coexists with the review-site container.
Requires baselines to already exist.

### Debug Mode
```bash
npm run test:visual:debug
```

### UI Mode (Interactive)
```bash
npm run test:visual:ui
```

## How It Works

1. **Build**: each command runs the Hugo config, `dist` (CSS/JS), and
   `docs-build` (writes `_site/`) before testing.
2. **Page Discovery**: `tests/utils/discover-pages.ts` walks the `_site/`
   directory and extracts all `index.html` pages.
3. **Screenshot Capture**: each page is loaded with Playwright and a full-page
   screenshot is taken on port 9002.
4. **Comparison**: new screenshots are compared against baseline snapshots;
   differences are reported.
5. **Artifacts**: on failure, `-actual`/`-expected`/`-diff` images go to
   `test-results/`, and an HTML report is written to `playwright-report/`.

## Accepting intentional changes

After a deliberate design change, regenerate the baselines:

```bash
npm run test:visual:update
```

Because baselines are gitignored, there is nothing to commit — regenerate them
locally whenever needed.

## Future work

- These baselines are OS/browser specific (e.g. `-chromium-darwin`). Making them
  reproducible across machines and CI would require normalizing rendering, for
  example by generating them inside a Docker container.
- CI integration and additional browser/viewport projects are out of scope for
  this initial local-only tooling.
