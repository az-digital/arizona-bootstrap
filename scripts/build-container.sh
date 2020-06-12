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

# Docker image name prefix (DockerHub org, etc.)
: "${AZ_IMAGEPREFIX:=azdigital/}"
# Docker base image name
: "${AZ_EPHEMERALIMAGENAME:=az-nodejs-ephemeral}"

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
# Initial sanity checking.

command -v docker > /dev/null \
  || errorexit "This reqires access to a Docker installation to run"

#------------------------------------------------------------------------------
# Use the checksum for the Ruby Gem and Node.js npm lockfiles as an image tag.

lockhash=$(sha256sum Dockerfile Gemfile.lock package-lock.json | awk '{ print $1 }' | sha256sum - | awk '{ print $1 }') \
  || errorexit "Couldn't obtain the checksum for the lock files"
ephemeral="${AZ_IMAGEPREFIX}${AZ_EPHEMERALIMAGENAME}:${lockhash}"
tagsearch=$(docker image ls "$ephemeral" ) \
  || errorexit "Docker error when searching for the presence or absence of the ephemeral image"

#------------------------------------------------------------------------------
# If the ephemeral image doesn't yet exist, build it.

if echo "$tagsearch" | grep -q "$lockhash" ; then
  logmessage "Found a pre-built image, ${ephemeral}"
else
  logmessage "Building a new ${AZ_EPHEMERALIMAGENAME} image"
  if [ -z "$AZ_BOOTSTRAP_SOURCE_DIR" ] ; then
    docker build -t "$ephemeral" . \
      || errorexit "Failed to build a new ${ephemeral} Docker image"
  else
    docker build -t "$ephemeral" --build-arg AZ_BOOTSTRAP_SOURCE_DIR . \
      || errorexit "Failed to build a new ${ephemeral} Docker image preconfigured with the ${AZ_BOOTSTRAP_SOURCE_DIR} shared source directory"
  fi
fi

#------------------------------------------------------------------------------
# Emit the pre-existing or newly built image ID.

docker image ls "$ephemeral" | grep "$lockhash" | awk '{ print $3 }'
