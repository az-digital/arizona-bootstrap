#!/bin/sh
#------------------------------------------------------------------------------
#
# build-review-site.sh: build the documentation site with the latest changes.
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Internal directory used for the build
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
#------------------------------------------------------------------------------

set -e

create-source-links

cd "$AZ_BOOTSTRAP_DEST_DIR"

npm run dist
npm run docs-review
