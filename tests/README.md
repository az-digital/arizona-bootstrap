# Visual Regression Tests

Compares two already-deployed sites - a "before" baseline and an "after"
candidate - page by page, using [Playwright](https://playwright.dev/). Built
for reviewing a PR's [review
site](https://review.digital.arizona.edu/arizona-bootstrap/) against `main`,
without building anything locally to serve or deploy.

## GitHub Action

Run **Manual visual regression (before/after)** from the Actions tab
(`workflow_dispatch`). Provide:

- `after_url` (required) - the site to test, e.g. a PR's review site
  (`https://review.digital.arizona.edu/arizona-bootstrap/<branch>/`).
- `before_url` (optional) - the baseline to compare against. Defaults to the
  `main` review site (`https://review.digital.arizona.edu/arizona-bootstrap/main/`).

The run's job summary links to the deployed HTML report (before/after/diff
images per page), hosted alongside review sites at
`https://review.digital.arizona.edu/arizona-bootstrap/vr-reports/<run-id>/`.

## Running locally

```bash
scripts/vr-url-test.sh --after https://review.digital.arizona.edu/arizona-bootstrap/<branch>/
# or override the baseline too:
scripts/vr-url-test.sh --after <url> --before https://review.digital.arizona.edu/arizona-bootstrap/5.2.x/
# or scope to a subset of pages (forwarded to Playwright's --grep):
scripts/vr-url-test.sh --after <url> --grep "components/buttons"

# equivalently, via npm:
npm run test:visual -- --after <url>
```

View a failing run's report with `npx playwright show-report` (needs Node ≥
20) or by opening `playwright-report/index.html` directly.

## How it works

1. **Page discovery**: the checked-out tree is built locally
   (`npm run dist && npm run docs-serve-config && npm run docs-build`) purely
   to enumerate the pages Hugo renders (`tests/utils/discover-pages.ts` walks
   `_site/` for `index.html` files). Nothing from this local build is
   screenshotted or deployed - `publishDir` layout mirrors page permalinks
   regardless of `baseURL`, so these paths apply equally to any deployed
   instance of the same content.
2. **Seed**: Playwright visits every discovered page on the `--before` URL and
   saves screenshots as baselines (`--update-snapshots`).
3. **Compare**: Playwright visits the same pages on the `--after` URL and
   compares against those baselines.
4. **Artifacts**: on failure, `-actual`/`-expected`/`-diff` images are written
   to `test-results/`, and an HTML report to `playwright-report/` (both
   gitignored).

## Caveats

- **Assumes matching page structure.** Page discovery builds the *checked-out*
  branch, then screenshots that same page list on both URLs. If `--before` is
  missing a page that exists in the current branch, that page simply won't
  have a baseline to compare against, and Playwright will report a missing
  snapshot.
- **Network variance.** Because both sites are fetched over the network,
  transient load times or CDN differences can occasionally cause noise. If a
  run is flaky, re-run it.
