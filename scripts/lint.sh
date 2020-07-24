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

set -ex

create-source-links

cd "$AZ_BOOTSTRAP_DEST_DIR"

create-jekyll-config

npm install
bundle install
npm run dist
npm run docs
npm run lint
