#!/bin/sh
#------------------------------------------------------------------------------
#
# expose-review-site.sh: build the documentation site, copy back to the source
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Internal directory used for the build
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
# Optional environment variables
# - AZ_SHORT_VERSION Short (generally two-digit) documentation version
# - AZ_SITE_BASE_URL Pefix to add after the host to all URLs served locally
# - AZ_VERSION Full current Arizona Bootstrap version number
#
#------------------------------------------------------------------------------

set -e

create-source-links

cd "$AZ_BOOTSTRAP_DEST_DIR"

create-hugo-config

npm run dist
npm run css
npm run js
npm run docs-build

sync-static-site-dir
