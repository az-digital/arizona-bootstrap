#!/usr/bin/env bash
#------------------------------------------------------------------------------
#
# vr-test.sh: build the docs site and run Playwright visual regression tests
#             against the CURRENTLY checked-out branch.
#
# This is the base building block. It has no git side effects: it builds
# whatever is checked out right now and runs Playwright on it. The dedicated
# visual-regression server (see playwright.config.ts, default port 9002) is
# started and stopped by Playwright, so this can run alongside the review-site
# container (scripts/build-container.sh) on port 9001.
#
# Any arguments are passed straight through to `playwright test`, e.g.:
#   scripts/vr-test.sh                     # compare against existing baselines
#   scripts/vr-test.sh --update-snapshots  # (re)generate baselines
#   scripts/vr-test.sh --ui                # interactive runner
#   scripts/vr-test.sh --debug             # debug mode
#
# Returns:
#   0 on success (no visual differences), non-zero otherwise.
#
#------------------------------------------------------------------------------

set -euo pipefail

# Always run from the repository root, regardless of the caller's cwd.
cd "$(dirname "$0")/.."

# Fail fast on unsupported Node versions. The build toolchain (see engines in
# package.json) requires Node >= 20; older versions fail partway through with
# opaque errors. macOS Homebrew's default `node` may still be v18.
required_node_major=20
node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$node_major" -lt "$required_node_major" ] ; then
  echo "** Visual regression requires Node >= ${required_node_major}, but 'node' is $(node -v 2>/dev/null || echo 'not found')." >&2
  echo "** Activate a newer Node first, e.g. 'nvm use 22' or add a Homebrew keg to PATH:" >&2
  echo "**   export PATH=\"\$(brew --prefix)/opt/node@22/bin:\$PATH\"" >&2
  exit 1
fi

# Derive the Hugo configuration (hugo.yml is generated and gitignored).
npm run docs-serve-config

# Compile the CSS and JS into dist/ (gitignored; required for the site to render).
npm run dist

# Build the static site into _site/ (gitignored). Page discovery in
# tests/utils/discover-pages.ts reads _site/ from disk at test-collection time,
# so this must happen before Playwright starts.
npm run docs-build

# Make sure the Chromium browser Playwright needs is installed.
npx playwright install chromium

# Run the visual regression suite. Playwright starts the hugo server defined in
# playwright.config.ts, runs the tests, then shuts the server down.
npx playwright test "$@"
