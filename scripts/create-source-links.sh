#!/bin/sh
#------------------------------------------------------------------------------
#
# create-source-links.sh: link the source files into the build directory.
#
# Required environment variables
# - AZ_BOOTSTRAP_DEST_DIR Linked file and directory destination
# - AZ_BOOTSTRAP_SOURCE_DIR Source directory for files and directories to link
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
# List of things to link (being selective, not taking the entire directory).

linkwhitelist=".stylelintignore \
  .stylelintrc \
  CONTRIBUTING.md \
  LICENSE \
  README.md \
  _config_template.yml \
  dist \
  js \
  scripts \
  scss \
  site \
"

#------------------------------------------------------------------------------
# Initial run-time error checking.

[ -n "$AZ_BOOTSTRAP_DEST_DIR" ] \
  || errorexit "No destination specified"
[ -n "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "No source directory specified"
[ -d "$AZ_BOOTSTRAP_DEST_DIR" ] \
  || errorexit "Couldn't find the destination directory ${AZ_BOOTSTRAP_DEST_DIR}"
[ -d "$AZ_BOOTSTRAP_SOURCE_DIR" ] \
  || errorexit "Couldn't find the source directory ${AZ_BOOTSTRAP_SOURCE_DIR}"

#------------------------------------------------------------------------------
# Make the links.

logmessage "Linking entries from ${AZ_BOOTSTRAP_SOURCE_DIR} to ${AZ_BOOTSTRAP_DEST_DIR}"

nfound=0
for x in $linkwhitelist ; do
  src="${AZ_BOOTSTRAP_SOURCE_DIR}/${x}"
  if [ -e "$src" ] ; then
    dest="${AZ_BOOTSTRAP_DEST_DIR}/${x}"
    logmessage "  - linking ${src} --> ${dest}"
    ln -s "$src" "$dest" \
      || errorexit "failed linking ${src}"
    nfound=$((nfound+1))
  else
    logmessage "  - skipping missing ${src}"
  fi
done
[ $nfound -gt 0 ] \
  || errorexit "Nothing linked: all entries in ${AZ_BOOTSTRAP_SOURCE_DIR} missing"

#------------------------------------------------------------------------------
# Copy, don't link, the build subdirectory.

logmessage "Copying the /build subdirectory"

cp -R "${AZ_BOOTSTRAP_SOURCE_DIR}/build" "${AZ_BOOTSTRAP_DEST_DIR}/build" \
 || errorexit "Couldn't copy the /build subdirectory from ${AZ_BOOTSTRAP_SOURCE_DIR} to ${AZ_BOOTSTRAP_DEST_DIR}"

normalexit "Linked $nfound entries"
