#!/bin/sh
#------------------------------------------------------------------------------
#
# create-release.sh: prepare a release
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Internal directory used for the build
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
# - AZ_RELEASE_VERSION New release version
#
#------------------------------------------------------------------------------

set -e

create-source-links

cd "$AZ_BOOTSTRAP_DEST_DIR"

npm run version --no-git-tag-version ${AZ_RELEASE_VERSION}
