#!/bin/sh
#------------------------------------------------------------------------------
#
# serve-review-site.sh: serve the documentation site locally.
#
# Required environment variables
# - AZ_BOOTSTRAP_FROZEN_DIR Internal directory with saved npm setup
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
# Optional environment variables
# - AZ_SHORT_VERSION Short (generally two-digit) documentation version
# - AZ_SITE_BASE_URL Pefix to add after the host to all URLs served locally
# - AZ_SITE_HOST Name or IP address at which to serve the documentation site
# - AZ_VERSION Full current Arizona Bootstrap version number
#
#------------------------------------------------------------------------------

set -e

copy-npm-config

cd "$AZ_BOOTSTRAP_SOURCE_DIR"

create-hugo-config

npm run dist
npm run docs-serve-external
