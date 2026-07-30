#!/usr/bin/env bash
#------------------------------------------------------------------------------
#
# vr-test-main.sh: run visual regression comparing the CURRENT branch against
#                  main.
#
# Because baselines are not committed (see .gitignore), this command generates
# the baseline from main and then compares the current branch against it, all in
# a single run:
#
#   1. Seed baselines from the base branch (main) with --update-snapshots.
#   2. Return to the original branch.
#   3. Capture fresh screenshots and compare them to the main baselines.
#
# It only orchestrates git; the actual build+test work is delegated to
# scripts/vr-test.sh (invoked twice).
#
# Environment variables:
#   BASE_BRANCH  Branch used as the baseline reference. Default: main.
#
# Returns:
#   0 on success (no visual differences), non-zero otherwise.
#
#------------------------------------------------------------------------------

set -euo pipefail

# Always run from the repository root, regardless of the caller's cwd.
cd "$(dirname "$0")/.."

# Fail fast on unsupported Node versions before any git side effects. The build
# toolchain (see engines in package.json) requires Node >= 20.
required_node_major=20
node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$node_major" -lt "$required_node_major" ] ; then
  echo "** Visual regression requires Node >= ${required_node_major}, but 'node' is $(node -v 2>/dev/null || echo 'not found')." >&2
  echo "** Activate a newer Node first, e.g. 'nvm use 22' or add a Homebrew keg to PATH:" >&2
  echo "**   export PATH=\"\$(brew --prefix)/opt/node@22/bin:\$PATH\"" >&2
  exit 1
fi

BASE_BRANCH="${BASE_BRANCH:-main}"
CURRENT="$(git rev-parse --abbrev-ref HEAD)"

errorexit () {
  echo "** $1" >&2
  exit 1
}

#------------------------------------------------------------------------------
# Hard stop: refuse to run while the review-site container (or anything else)
# holds port 9001. This flow does `git checkout`, and the container live-watches
# the working tree; switching branches underneath it produces erratic results.

port_in_use () {
  if command -v lsof > /dev/null 2>&1 ; then
    lsof -iTCP:9001 -sTCP:LISTEN > /dev/null 2>&1
  elif command -v nc > /dev/null 2>&1 ; then
    nc -z localhost 9001 > /dev/null 2>&1
  else
    # Can't determine; assume free rather than blocking the developer.
    return 1
  fi
}

if port_in_use ; then
  errorexit "Port 9001 is in use. A review-site container (scripts/build-container.sh) may be running. Stop it before running this command, because it live-watches the working tree while this flow switches branches."
fi

#------------------------------------------------------------------------------
# Guard: nothing to compare if we're already on the base branch.

if [ "$CURRENT" = "$BASE_BRANCH" ] ; then
  echo "Already on '$BASE_BRANCH'; there is nothing to compare against. Check out your feature branch first." >&2
  exit 0
fi

#------------------------------------------------------------------------------
# Guard: refuse to run mid-merge or mid-rebase, where checkout is unsafe.

git_dir="$(git rev-parse --git-dir)"
if [ -e "$git_dir/MERGE_HEAD" ] \
  || [ -d "$git_dir/rebase-merge" ] \
  || [ -d "$git_dir/rebase-apply" ] ; then
  errorexit "A merge or rebase is in progress. Finish or abort it before running this command."
fi

#------------------------------------------------------------------------------
# Stash any uncommitted work so the base branch can be checked out cleanly.
# Gitignored files (including the baseline snapshots) are not stashed, so the
# baselines generated on main survive the switch back.

STASHED=0
if [ -n "$(git status --porcelain)" ] ; then
  git stash push -u -m "vr-test-main: autostash for $CURRENT"
  STASHED=1
fi

#------------------------------------------------------------------------------
# Always return to the starting branch and restore stashed work, even if a
# build fails partway through, so the developer is never stranded on main.

cleanup () {
  local ret=$?
  local now
  now="$(git rev-parse --abbrev-ref HEAD)"
  if [ "$now" != "$CURRENT" ] ; then
    git checkout "$CURRENT" || echo "** Failed to return to '$CURRENT'. Please check out your branch manually." >&2
  fi
  if [ "$STASHED" -eq 1 ] ; then
    git stash pop || echo "** Failed to restore stashed changes automatically. Run 'git stash pop' manually." >&2
    STASHED=0
  fi
  return $ret
}
trap cleanup EXIT

#------------------------------------------------------------------------------
# 1. Seed baselines from the base branch.

echo "Seeding baselines from '$BASE_BRANCH'..." >&2
git checkout "$BASE_BRANCH"
scripts/vr-test.sh --update-snapshots

#------------------------------------------------------------------------------
# 2. Return to the original branch (and restore stashed work) before comparing.

echo "Comparing '$CURRENT' against the '$BASE_BRANCH' baselines..." >&2
git checkout "$CURRENT"
if [ "$STASHED" -eq 1 ] ; then
  git stash pop
  STASHED=0
fi

#------------------------------------------------------------------------------
# 3. Compare the current branch against the main baselines.

scripts/vr-test.sh
