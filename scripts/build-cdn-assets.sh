#!/bin/sh
#------------------------------------------------------------------------------
#
# build-cdn-assets.sh: rebuild the dist directory with the latest changes.
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
