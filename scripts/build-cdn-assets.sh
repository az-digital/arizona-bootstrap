#!/bin/sh
#------------------------------------------------------------------------------
#
# build-cdn-assets.sh: rebuild the dist directory with the latest changes.
#
# Required environment variables
# - AZ_BOOTSTRAP_FROZEN_DIR Internal directory with saved npm setup
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
#------------------------------------------------------------------------------

set -e

copy-npm-config

cd "$AZ_BOOTSTRAP_SOURCE_DIR"

npm run dist
