'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Arizona Bootstrap${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under ${pkg.license} (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */`
}

module.exports = getBanner
