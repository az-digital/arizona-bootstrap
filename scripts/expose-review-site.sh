#!/bin/sh
#------------------------------------------------------------------------------
#
# expose-review-site.sh: build the documentation site, copy back to the source
#
# Required environment variables
# - AZ_BOOTSTRAP_FROZEN_DIR Internal directory with saved npm setup
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories
#
# Optional environment variables
# - AZ_SHORT_VERSION Short (generally two-digit) documentation version
# - AZ_SITE_BASE_URL Pefix to add after the host to all URLs served locally
# - AZ_VERSION Full current Arizona Bootstrap version number
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

[ -n "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "No source directory specified"
[ -d "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "Couldn't find the source directory ${AZ_BOOTSTRAP_SOURCE_DIR}"

#------------------------------------------------------------------------------
# Discover the existing file ownership.

ownership=$(stat --format='%u:%g' "${AZ_BOOTSTRAP_SOURCE_DIR}/package.json") \
  || errorexit "Failed to determine the ownership of the existing package.json file"

#------------------------------------------------------------------------------
# Build the site.

copy-npm-config

cd "$AZ_BOOTSTRAP_SOURCE_DIR"

create-hugo-config

npm run dist
npm run css
npm run js
npm run docs-build \
  || logmessage "Document building finished with status ${?}"

#------------------------------------------------------------------------------
# Fix the file ownership (for permission problems).

docsdir="${AZ_BOOTSTRAP_SOURCE_DIR}/_site"
[ -d "$docsdir" ] \
  || errorexit "Couldn't find the built documentation directory ${docsdir}"
chown --recursive "$ownership" "$docsdir" \
  || errorexit "Failed to reset the permissions on the ${docsdir} documentation site to ${ownership}"

normalexit "Documentation site built at ${docsdir}"