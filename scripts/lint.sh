#!/bin/sh
#------------------------------------------------------------------------------
#
# lint.sh: run code linting checks after a rebuild.
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Internal directory used for the build
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
#------------------------------------------------------------------------------

set -e

create-source-links

cd "$AZ_BOOTSTRAP_DEST_DIR"

create-jekyll-config

npm run dist
npm run docs
