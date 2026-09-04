#!/usr/bin/env bash
#------------------------------------------------------------------------------
#
# vr-url-test.sh: visual regression between two already-deployed sites, e.g. a
#                 review site for a PR branch (--after) against the main
#                 review site (--before, the default).
#
# Usage:
#   scripts/vr-url-test.sh --after <url> [--before <url>]
#
#   scripts/vr-url-test.sh --after https://review.digital.arizona.edu/arizona-bootstrap/issue-1234
#   scripts/vr-url-test.sh --after <url> --before https://review.digital.arizona.edu/arizona-bootstrap/5.2.x
#
# How it works:
#   1. The checked-out tree is built locally (npm run dist / docs-serve-config
#      / docs-build) purely to enumerate the pages Hugo renders - nothing from
#      this build is deployed or screenshotted.
#   2. Playwright runs twice against that same page list: once against the
#      "before" URL with --update-snapshots to seed baselines, then again
#      against the "after" URL to compare against them.
#
# Because both URLs are already-built, already-deployed sites, this needs no
# Docker: it only requires the page structure of the checked-out branch to
# match what's deployed at --after closely enough to enumerate the same pages
# (true for a branch compared against its own review site).
#
# Returns:
#   0 on success (no visual differences), non-zero otherwise.
#
#------------------------------------------------------------------------------

set -euo pipefail

# Always run from the repository root, regardless of the caller's cwd.
cd "$(dirname "$0")/.."

errorexit () {
  echo "** $1" >&2
  exit 1
}

#------------------------------------------------------------------------------
# Parse arguments.

BEFORE_URL="https://review.digital.arizona.edu/arizona-bootstrap/main/"
AFTER_URL=""
GREP_PATTERN=""
while [ $# -gt 0 ] ; do
  case "$1" in
    --after)    [ $# -ge 2 ] || errorexit "--after requires a URL." ; AFTER_URL="$2" ; shift 2 ;;
    --after=*)  AFTER_URL="${1#*=}" ; shift ;;
    --before)   [ $# -ge 2 ] || errorexit "--before requires a URL." ; BEFORE_URL="$2" ; shift 2 ;;
    --before=*) BEFORE_URL="${1#*=}" ; shift ;;
    # Scope to a subset of pages, e.g. for a quick local/CI check instead of
    # the full site. Forwarded to Playwright's own --grep.
    --grep)     [ $# -ge 2 ] || errorexit "--grep requires a pattern." ; GREP_PATTERN="$2" ; shift 2 ;;
    --grep=*)   GREP_PATTERN="${1#*=}" ; shift ;;
    -h|--help)  echo "Usage: scripts/vr-url-test.sh --after <url> [--before <url>] [--grep <pattern>]" ; exit 0 ;;
    *) errorexit "Unknown argument '$1' (usage: scripts/vr-url-test.sh --after <url> [--before <url>] [--grep <pattern>])." ;;
  esac
done

[ -n "$AFTER_URL" ] || errorexit "Usage: scripts/vr-url-test.sh --after <url> [--before <url>] [--grep <pattern>]"

GREP_ARGS=()
[ -n "$GREP_PATTERN" ] && GREP_ARGS=(--grep "$GREP_PATTERN")

#------------------------------------------------------------------------------
# Build the site locally, purely to enumerate its pages (see
# tests/global-setup.ts / tests/utils/discover-pages.ts). Nothing from this
# build is screenshotted or deployed.

echo "Building the docs site locally to enumerate its pages..." >&2
npm run --silent dist
npm run --silent docs-serve-config
npm run --silent docs-build

#------------------------------------------------------------------------------
# 1. Seed baseline screenshots from the "before" URL. Baselines are ephemeral
#    (not committed - see .gitignore), so start from a clean directory in
#    case a previous local run left stale pages behind.

rm -rf .vr-baselines

echo "Seeding baseline screenshots from '$BEFORE_URL'..." >&2
VR_BEFORE_URL="$BEFORE_URL" VR_AFTER_URL="$AFTER_URL" VR_PASS=before \
  npx playwright test --update-snapshots "${GREP_ARGS[@]}"

#------------------------------------------------------------------------------
# 2. Screenshot the "after" URL and compare against the baseline.

echo "Comparing '$AFTER_URL' against the '$BEFORE_URL' baseline..." >&2
VR_BEFORE_URL="$BEFORE_URL" VR_AFTER_URL="$AFTER_URL" VR_PASS=after \
  npx playwright test "${GREP_ARGS[@]}"

echo "Visual regression passed: no differences from '$BEFORE_URL'." >&2
