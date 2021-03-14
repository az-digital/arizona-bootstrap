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
# Temporary hash file name
: "${AZ_HASHTEMP:=az_hashtemp}"

#------------------------------------------------------------------------------
# Utility definitions.

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

if command -v sha256sum > /dev/null ; then
  taghash () {
    find "$@" -type f -exec sha256sum {} \; | awk '{ print $1 }' | sha256sum - | awk '{ print $1 }'
  }
elif command -v shasum > /dev/null ; then
  taghash () {
    find "$@" -type f -exec shasum -a 256 {} \; | awk '{ print $1 }' | shasum -a 256  - | awk '{ print $1 }'
  }
elif command -v CertUtil > /dev/null ; then
  taghash () {
    find "$@" -type f -exec CertUtil -hashfile {} SHA256 \; | grep -E '^[0-9a-f]+$' > "$AZ_HASHTEMP"
    CertUtil -hashfile "$AZ_HASHTEMP" SHA256
    rm "$AZ_HASHTEMP"
  }
else
  errorexit "Can't find anything to compute SHA256 checksums"
fi

#------------------------------------------------------------------------------
# Use the checksum for the scripts, Dockerfile, & npm lockfile as an image tag.

lockhash=$(taghash Dockerfile Gemfile.lock package-lock.json scripts) \
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

imagelsout=$(docker image ls "$ephemeral" | grep "$lockhash")
[ -n "$imagelsout" ] \
  || errorexit  "Couldn't find the Docker image ID code"
echo "$imagelsout" | awk '{ print "ImageID=" $3 }'

normalexit "Docker image available"
