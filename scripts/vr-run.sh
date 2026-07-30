#!/bin/sh
#------------------------------------------------------------------------------
#
# vr-run.sh: build the docs site and run Playwright visual regression tests
#            INSIDE the container, against whatever source tree is mounted at
#            $AZ_BOOTSTRAP_SOURCE_DIR.
#
# This is the in-container entrypoint (installed as /usr/local/bin/vr-run). It
# is orchestrated from the host by scripts/vr-test.sh, which mounts an exported
# source tree and a shared baseline directory ($VR_SNAPSHOT_DIR) into each run.
#
# Any arguments are passed straight through to `playwright test`, e.g.
# --update-snapshots when seeding baselines from the base branch.
#
#------------------------------------------------------------------------------

set -e

cd "$AZ_BOOTSTRAP_SOURCE_DIR"

# Use the image's prebuilt node_modules (with Linux-native binaries) without
# overwriting this tree's own package.json/package-lock.json, so each branch
# builds with its own dependencies and version number.
if [ ! -e node_modules ] ; then
  ln -s "$AZ_BOOTSTRAP_FROZEN_DIR/node_modules" node_modules
fi

create-hugo-config

npm run dist
npm run docs-build

# Chromium is preinstalled in the image (PLAYWRIGHT_BROWSERS_PATH); don't try to
# download it at run time.
npx --no-install playwright test "$@"
