#!/bin/sh
#------------------------------------------------------------------------------
#
# lint.sh: run code linting checks after a rebuild.
#
# Required environment variables
# - AZ_BOOTSTRAP_FROZEN_DIR Internal directory with saved npm setup
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
#------------------------------------------------------------------------------

set -e

copy-npm-config

cd "$AZ_BOOTSTRAP_SOURCE_DIR"

create-hugo-config

npm run dist
npm run docs
npm run lint
