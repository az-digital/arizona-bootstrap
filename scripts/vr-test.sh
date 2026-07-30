#!/usr/bin/env bash
#------------------------------------------------------------------------------
#
# vr-test.sh: run visual regression comparing the CURRENT branch (HEAD) against
#             a base branch, entirely inside the shared Docker container.
#
# Usage:
#   scripts/vr-test.sh --base <branch>
#
#   scripts/vr-test.sh --base main     # compare HEAD against main
#   scripts/vr-test.sh --base 5.2.x    # compare a 5.2 feature against 5.2.x
#
# How it works (and why it is safe to run in a second terminal, alongside a
# running scripts/build-container.sh review site):
#
#   1. Both branches are exported with `git archive` into throwaway temp dirs.
#      Nothing is checked out and the working tree is never switched, so a
#      running review-site container that live-watches the tree is undisturbed.
#   2. Each exported tree is built and screenshotted inside the container
#      (scripts/vr-run.sh). Baselines from the base branch and screenshots from
#      the current branch share one mounted directory, so they compare directly.
#   3. Because everything builds in the Linux container, the host toolchain and
#      platform are irrelevant, and baselines are reproducible (-chromium-linux).
#
# Assumes the base branch already contains the VR tooling (playwright.config.ts,
# tests/, this image). Compares COMMITTED state (HEAD); commit local changes
# first to include them.
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

BASE_BRANCH=""
while [ $# -gt 0 ] ; do
  case "$1" in
    --base)   [ $# -ge 2 ] || errorexit "--base requires a branch name." ; BASE_BRANCH="$2" ; shift 2 ;;
    --base=*) BASE_BRANCH="${1#*=}" ; shift ;;
    -h|--help) echo "Usage: scripts/vr-test.sh --base <branch>" ; exit 0 ;;
    *) errorexit "Unknown argument '$1' (usage: scripts/vr-test.sh --base <branch>)." ;;
  esac
done

[ -n "$BASE_BRANCH" ] || errorexit "Usage: scripts/vr-test.sh --base <branch>"

command -v docker > /dev/null 2>&1 \
  || errorexit "Docker is required but was not found on PATH."

#------------------------------------------------------------------------------
# Resolve the base branch to a commit: prefer a local branch, then
# origin/<branch>, then any ref/commit that resolves.

if git rev-parse --verify --quiet "refs/heads/$BASE_BRANCH" > /dev/null ; then
  BASE_REF="refs/heads/$BASE_BRANCH"
elif git rev-parse --verify --quiet "refs/remotes/origin/$BASE_BRANCH" > /dev/null ; then
  BASE_REF="refs/remotes/origin/$BASE_BRANCH"
elif git rev-parse --verify --quiet "${BASE_BRANCH}^{commit}" > /dev/null ; then
  BASE_REF="$BASE_BRANCH"
else
  errorexit "Base branch '$BASE_BRANCH' was not found locally or on origin. Fetch it first, e.g. 'git fetch origin $BASE_BRANCH'."
fi

#------------------------------------------------------------------------------
# Build/locate the shared container image (all progress goes to stderr).

imageid="$(scripts/build-container-image.sh)"

#------------------------------------------------------------------------------
# Scratch space: exported source trees, a shared baseline directory, and
# host-visible directories for the Playwright report and diff artifacts.

scratch="$(mktemp -d)"
baselines="$(mktemp -d)"
base_src="$scratch/base"
curr_src="$scratch/current"
mkdir -p "$base_src" "$curr_src"

report_dir="$PWD/playwright-report"
results_dir="$PWD/test-results"
mkdir -p "$report_dir" "$results_dir"

cleanup () {
  rm -rf "$scratch" "$baselines"
}
trap cleanup EXIT

echo "Exporting base '$BASE_BRANCH' and current (HEAD) sources..." >&2
git archive --format=tar "$BASE_REF" | tar -x -C "$base_src"
git archive --format=tar HEAD | tar -x -C "$curr_src"

#------------------------------------------------------------------------------
# 1. Seed baselines from the base branch (inside the container).

echo "Seeding baselines from '$BASE_BRANCH' (in container)..." >&2
docker run --rm \
  -v "$base_src":/arizona-bootstrap-source \
  -v "$baselines":/vr-baselines \
  -e VR_SNAPSHOT_DIR=/vr-baselines \
  "$imageid" vr-run --update-snapshots

#------------------------------------------------------------------------------
# 2. Screenshot the current branch and compare against the base baselines. The
#    report and any diff artifacts are written to host directories so they can
#    be inspected after a failure.

echo "Comparing current (HEAD) against '$BASE_BRANCH' baselines (in container)..." >&2
docker run --rm \
  -v "$curr_src":/arizona-bootstrap-source \
  -v "$baselines":/vr-baselines \
  -v "$report_dir":/arizona-bootstrap-source/playwright-report \
  -v "$results_dir":/arizona-bootstrap-source/test-results \
  -e VR_SNAPSHOT_DIR=/vr-baselines \
  "$imageid" vr-run

echo "Visual regression passed: no differences from '$BASE_BRANCH'." >&2
