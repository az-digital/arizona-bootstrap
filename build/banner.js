'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Arizona Bootstrap${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under ${pkg.license} (https://bitbucket.org/uadigital/arizona-bootstrap/raw/master/LICENSE)
  */`
}

module.exports = getBanner
