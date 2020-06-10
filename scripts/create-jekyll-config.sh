#!/bin/sh
#------------------------------------------------------------------------------
#
# create-jekyll-config.sh: fill in the Jekyll static site generator config.
#
# Environment variables
# - AZ_SHORT_VERSION Short (generally two-digit) documentation version
# - AZ_SITE_BASE_URL Pefix to add after the host to all URLs served locally
# - AZ_SITE_HOST Name or IP address at which to serve the documentation site
# - AZ_VERSION Full current Arizona Bootstrap version number
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
# Initial settings and sanity check

jekyll_config_template='_config_template.yml'
jekyll_config='_config.yml'
[ -r "$jekyll_config_template" ] \
  || errorexit "Couldn't read the Jekyll configuration template file"

#------------------------------------------------------------------------------
# Environment variable defaults.

if [ -z "$AZ_VERSION" ] ; then
  AZ_VERSION=$(jq -r '.version' package.json)
  [ -n "$AZ_VERSION" ] \
    || errorexit "Coildn't find the full Arizona Bootstrap version number"
fi

if [ -z "$AZ_SHORT_VERSION" ] ; then
  AZ_SHORT_VERSION=$(jq -r '.version_short' package.json)
  [ -n "$AZ_SHORT_VERSION" ] \
    || errorexit "Couldn't find the short (documentation) version number"
fi

if [ -z "$AZ_SITE_HOST" ] ; then
  # Prevent hiding the host address inside containers.
  if [ -e /proc/1/cgroup ] && grep -q -e '/docker/' /proc/1/cgroup ; then
    AZ_SITE_HOST='0.0.0.0'
  else
    AZ_SITE_HOST='localhost'
  fi
fi

#------------------------------------------------------------------------------
# Process the template.

sed -e "s#{{az_short_version}}#$AZ_SHORT_VERSION#g" \
  -e "s#{{az_site_base_url}}#$AZ_SITE_BASE_URL#g" \
  -e "s#{{az_site_host}}#$AZ_SITE_HOST#g" \
  -e "s#{{az_version}}#$AZ_VERSION#g" \
  "$jekyll_config_template" \
  > "$jekyll_config" \
  || errorexit "Failed to make the Jekyll configuration ${jekyll_config} frpm the template ${jekyll_config_template}"

normalexit "Created the ${jekyll_config} Jekyll configuration"