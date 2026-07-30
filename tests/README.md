# Visual Regression Tests

This directory contains visual regression (VR) tests using Playwright for
Arizona Bootstrap. They screenshot every page of the built docs site and compare
those screenshots against baseline images to catch unintended visual changes.

VR runs **entirely inside the shared Docker container** (the same image used by
`scripts/build-container.sh`). It compares your current branch against a base
branch — building and screenshotting both in Linux — so results are independent
of your host OS/toolchain and are reproducible across machines and CI.

## Requirements

- **Docker** (Docker Desktop on macOS/Windows, or Docker Engine on Linux).
- Nothing else on the host: no Node, no browser install. The container provides
  Node, the toolchain, Hugo, and Chromium.

The image is built automatically on first use (and rebuilt when the
`Dockerfile`, `scripts/`, or lockfile change), via
`scripts/build-container-image.sh`. If you already run
`scripts/build-container.sh`, the image is shared and no extra build is needed.

## Command

Compare the current branch (`HEAD`) against a base branch:

```bash
scripts/vr-test.sh --base main     # compare HEAD against main
scripts/vr-test.sh --base 5.2.x    # compare a 5.2 feature against 5.2.x

# equivalently, via npm:
npm run test:visual -- --base 5.2.x
```

The base branch is resolved as a local branch, then `origin/<branch>`, then any
ref/commit. If it isn't present, fetch it first (e.g. `git fetch origin 5.2.x`).

VR compares **committed** state (`HEAD`); commit local changes first to include
them. It assumes the **base branch already contains the VR tooling**
(`playwright.config.ts`, `tests/`), which is true once this tooling has been
merged into that branch.

> **Validate the mechanism** by comparing a branch against itself (identical
> source on both sides), which should report **no differences**:
>
> ```bash
> scripts/vr-test.sh --base <current-branch-name>
> ```

## Runs in parallel with the review site

`scripts/vr-test.sh` never checks out or switches your working tree: it exports
both branches with `git archive` into throwaway temp directories and builds them
in the container. So you can keep `scripts/build-container.sh` serving the review
site (port 9001) in one terminal and run VR in a second terminal — they don't
interfere, and VR terminates on its own.

Playwright serves each build on **port 9002** *inside* its container run (not
published), so there is no port conflict with the review site.

## Baselines are not committed

Baselines are OS/browser specific and churny, so they are **gitignored**. The
containerized flow doesn't rely on committed baselines at all: each run seeds
fresh baselines from the base branch into a temporary directory, compares the
current branch against them, and discards them afterward. Baselines are captured
in Linux, so they carry a `-chromium-linux` suffix and are reproducible.

## How It Works

1. **Export**: `git archive` writes the base branch and `HEAD` into temporary
   directories — no checkout, no working-tree changes.
2. **Build (in container)**: for each tree, `scripts/vr-run.sh` links the image's
   prebuilt `node_modules`, generates the Hugo config, and runs `dist` (CSS/JS)
   and `docs-build` (writes `_site/`). Each branch builds with its own
   `package.json`, so version strings render correctly.
3. **Page Discovery**: `tests/utils/discover-pages.ts` walks `_site/` and
   extracts all `index.html` pages.
4. **Screenshot Capture**: each page is loaded with Playwright and a full-page
   screenshot is taken on port 9002.
5. **Comparison**: the base run writes baselines (`--update-snapshots`) into a
   shared directory (`VR_SNAPSHOT_DIR`, see `playwright.config.ts`); the current
   run compares against them.
6. **Artifacts**: on failure, `-actual`/`-expected`/`-diff` images are written to
   `test-results/`, and an HTML report to `playwright-report/` (both on the host,
   gitignored). View the report with `npx playwright show-report`.

## Caveats

- **File ownership (Linux hosts):** the container runs as `node:node` (uid 1000),
  so artifacts written to `test-results/`/`playwright-report/` may be owned by
  that uid. On macOS Docker Desktop this is remapped to your user automatically.
- **Performance:** on macOS, screenshotting every page over a bind mount is
  slower than a native run.

## Future work

- CI integration (the Linux baselines produced here are reproducible, which makes
  this practical) and additional browser/viewport projects.
