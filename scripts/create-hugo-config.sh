#!/bin/sh
#------------------------------------------------------------------------------
#
# create-hugo-config.sh: fill in the Hugo static site generator config.
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

hugo_config_template='config_template.yml'
hugo_config='config.yml'
[ -r "$hugo_config_template" ] \
  || errorexit "Couldn't read the Hugo configuration template file"

#------------------------------------------------------------------------------
# Environment variable defaults.

if [ -z "$AZ_VERSION" ] ; then
  AZ_VERSION=$(jq -r '.version' package.json)
  [ -n "$AZ_VERSION" ] \
    || errorexit "Coildn't find the full Arizona Bootstrap version number"
fi

if [ -z "$AZ_SHORT_VERSION" ] ; then
  AZ_SHORT_VERSION=$(jq -r '.config.version_short' package.json)
  [ "$AZ_SHORT_VERSION" != 'null' ] \
    || errorexit "Couldn't find the short (documentation) version number"
fi

if [ -z "$AZ_SITE_HOST" ] ; then
  # Prevent hiding the host address inside containers.
  if [ -e /proc/1/cgroup ] && grep -q -e '/docker/' /proc/1/cgroup ; then
    AZ_SITE_HOST='http://0.0.0.0'
  else
    AZ_SITE_HOST='http://localhost'
  fi
elif [ "$AZ_SITE_HOST" = 'internal_files' ] ; then
  AZ_SITE_HOST=''
fi

#------------------------------------------------------------------------------
# Process the template.

sed -e "s#{{az_short_version}}#$AZ_SHORT_VERSION#g" \
  -e "s#{{az_site_base_url}}#$AZ_SITE_BASE_URL#g" \
  -e "s#{{az_site_host}}#$AZ_SITE_HOST#g" \
  -e "s#{{az_version}}#$AZ_VERSION#g" \
  "$hugo_config_template" \
  > "$hugo_config" \
  || errorexit "Failed to make the Hugo configuration ${hugo_config} from the template ${hugo_config_template}"

normalexit "Created the ${hugo_config} Hugo configuration"