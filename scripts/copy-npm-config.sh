#!/bin/sh
#------------------------------------------------------------------------------
#
# copy-npm-config.sh: overwrite the npm configuration with the saved copy.
#
# Required environment variables
# - AZ_BOOTSTRAP_FROZEN_DIR Saved npm configuration directory
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for builds
#
# Returns:
#   0 on success, 1 on any error.
#
#------------------------------------------------------------------------------

set -e

#------------------------------------------------------------------------------
# Utility function definitions.

errorexit () {
  echo "** $1." >&2
  exit 1
}

# Show progress on STDERR, unless explicitly quiet.
if [ -z "$AZ_QUIET" ]; then
  logmessage () {
    echo "$1..." >&2
  }
  normalexit () {
    echo "$1." >&2
    exit 0
  }
else
  logmessage () {
    return
  }
  normalexit () {
    exit 0
  }
fi

#------------------------------------------------------------------------------
# Initial run-time error checking.

[ -n "$AZ_BOOTSTRAP_FROZEN_DIR" ] \
  || errorexit "No saved npm configuration directory specified"
[ -n "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "No source directory specified"
[ -d "$AZ_BOOTSTRAP_FROZEN_DIR" ] \
  || errorexit "Couldn't find the saved npm directory ${AZ_BOOTSTRAP_FROZEN_DIR}"
[ -d "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "Couldn't find the source directory ${AZ_BOOTSTRAP_SOURCE_DIR}"

#------------------------------------------------------------------------------
# Discover the existing file ownership.

ownership=$(stat --format='%u:%g' "${AZ_BOOTSTRAP_SOURCE_DIR}/package.json") \
  || errorexit "Failed to determine the ownership of the existing package.json file"

#------------------------------------------------------------------------------
# Copy the setup.

if [ "$AZ_BOOTSTRAP_FROZEN_DIR" = "$AZ_BOOTSTRAP_SOURCE_DIR" ] ; then
  logmessage "Saved npm configuration specified as ${AZ_BOOTSTRAP_SOURCE_DIR}, so re-generating in place"
  npm install \
    || errorexit "npm install failed with status ${?}"
else
  logmessage "Copying saved configuration from ${AZ_BOOTSTRAP_FROZEN_DIR} to ${AZ_BOOTSTRAP_SOURCE_DIR}"
  rsync --recursive --links "${AZ_BOOTSTRAP_FROZEN_DIR}/" "$AZ_BOOTSTRAP_SOURCE_DIR" \
    || errorexit "rsync crashed with status ${?}"
fi
find "$AZ_BOOTSTRAP_SOURCE_DIR" -user root -exec chown "$ownership" {} \; \
  || errorexit "Failed to change ownership from root to ${ownership}"

normalexit "Copy complete"
