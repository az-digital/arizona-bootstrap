#!/bin/sh
#------------------------------------------------------------------------------
#
#  build-container.sh: use (and possibly make) a local Dockerized environment.
#
# Returns:
#   0 on success, 1 on any error.
#
#------------------------------------------------------------------------------

set -e

#------------------------------------------------------------------------------
# Environment variables and semi-constants.

# Docker base image name
: "${AZ_EPHEMERALIMAGENAME:=az-nodejs-ephemeral}"

#------------------------------------------------------------------------------
# Utility definitions.

# Show progress on STDERR, unless explicitly quiet.
if [ -z "$AZ_QUIET" ]; then
  normalexit () {
    echo "$1." >&2
    exit 0
  }
else
  normalexit () {
    exit 0
  }
fi

#------------------------------------------------------------------------------
# Build (if needed) and locate the shared ephemeral image. The build/caching
# logic lives in build-container-image.sh so other workflows (e.g. the
# visual-regression runner, scripts/vr-test.sh) can reuse the same image.

imageid=$("$(dirname "$0")/build-container-image.sh") \
  || exit 1

#------------------------------------------------------------------------------
# Spin up a local review site.

docker run -t -i --rm -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-source "$imageid" npm run docs-develop \
  || normalexit "Exited with status ${?}"

normalexit "The web server hosting the review site in the Docker container stopped (status ${?})"
