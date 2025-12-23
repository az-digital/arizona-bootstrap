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
# Internal directory for the saved npm setup
: "${AZ_BOOTSTRAP_FROZEN_DIR:=/azbuild/arizona-bootstrap}"
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

oldhash=$(taghash Dockerfile package-lock.json package.json scripts) \
  || errorexit "Couldn't obtain the checksum for the lock files"
oldtag="${AZ_IMAGEPREFIX}${AZ_EPHEMERALIMAGENAME}:${oldhash}"
tagsearch=$(docker image ls --format '{{.ID}}' "$oldtag" ) \
  || errorexit "Docker error when searching for the presence or absence of an existing image"

#------------------------------------------------------------------------------
# If the image doesn't yet exist, build it.

if [ -n "$tagsearch" ]; then
  logmessage "Found a pre-built image, ${oldtag}"
  ephemeral="$oldtag"
  lockhash="$oldhash"
else
  logmessage "Building a new ${AZ_EPHEMERALIMAGENAME} image"
  workingtitle="${AZ_EPHEMERALIMAGENAME}:working"
  docker buildx build --load  --platform=linux/amd64 --no-cache -t "$workingtitle" --build-arg AZ_BOOTSTRAP_FROZEN_DIR . \
    || errorexit "Failed to build a new ${AZ_EPHEMERALIMAGENAME} Docker image preconfigured with the ${AZ_BOOTSTRAP_FROZEN_DIR} npm directory"
  tempname="old${oldhash}"
  logmessage "Making a throwaway container, named ${tempname}, to extract the updated npm setup"
  docker run --name "$tempname" "$workingtitle" 'true' \
    || errorexit "Failed to run a container based on the image ${workingtitle}"
  docker cp -a "${tempname}:${AZ_BOOTSTRAP_FROZEN_DIR}/." . \
    || errorexit "Couldn't copy the saved npm setup to the actual source directory"
  docker rm "$tempname" \
    || errorexit "Failed to clean up the temporary container ${tempname}"
  logmessage "Updated the npm setup in the actual source directory, to include in the hash for the tag"
  lockhash=$(taghash Dockerfile package-lock.json package.json scripts) \
    || errorexit "Couldn't obtain the checksum from the updated files"
  ephemeral="${AZ_IMAGEPREFIX}${AZ_EPHEMERALIMAGENAME}:${lockhash}"
  docker tag "$workingtitle" "$ephemeral" \
    || errorexit "Failed to tag the image identified by ${workingtitle} with ${ephemeral}"
  logmessage "Tagged a new image, ${ephemeral}"
fi

#------------------------------------------------------------------------------
# Find the pre-existing or newly built image ID.

imageid=$(docker image ls --format '{{.ID}}' "$ephemeral")
[ -n "$imageid" ] \
  || errorexit  "Couldn't find the Docker image ID code"
docker tag "$imageid" "${AZ_EPHEMERALIMAGENAME}:latest" \
  || errorexit "Failed to make a convenience tag of '${AZ_EPHEMERALIMAGENAME}:latest' for the image ID ${imageid}"
logmessage "The image ID is ${imageid} (you can use this to run your own Docker containers with the same configuration)"

#------------------------------------------------------------------------------
# Spin up a local review site.

docker run -t -i --rm -p 9001:9001 -v "$(pwd)":/arizona-bootstrap-source "$imageid" npm run docs-develop \
  || normalexit "Exited with status ${?}"

normalexit "The web server hosting the review site in the Docker container stopped (status ${?})"
