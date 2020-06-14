#!/bin/sh
#------------------------------------------------------------------------------
#
# sync-static-site-dir.sh: backcopy the built static site subdirectory.
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Directory containing the static site subdirectory
# - AZ_BOOTSTRAP_SOURCE_DIR Resources used to build the static site
#
# Optional environment variables
# - AZ_STATIC_SITE_DIR Subdirectory containing the built static web site
#
# Note that this is copying from the destination back to the source directory.
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
# Environment variable defaults.

: "${AZ_STATIC_SITE_DIR:=_site}"

original="${AZ_BOOTSTRAP_DEST_DIR}/${AZ_STATIC_SITE_DIR}"
copy="${AZ_BOOTSTRAP_SOURCE_DIR}/${AZ_STATIC_SITE_DIR}"

#------------------------------------------------------------------------------
# Initial sanity check.

[ -d "$original" ] \
  || errorexit "Can't find the directory holding the static site to copy"

#------------------------------------------------------------------------------
# Copy everything.

logmessage "Synchronizing ${original} --> ${copy}"

rsync -r --delete "${original}" "${copy}" \
  || errorexit "rsync crashed with status ${?}"

normalexit "Synchronized"
