import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkgJson = path.join(__dirname, '../package.json')
const pkg = JSON.parse(await fs.readFile(pkgJson, 'utf8'))

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Arizona Bootstrap${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} The Arizona Board of Regents on behalf of The University of Arizona
  * Licensed under ${pkg.license} (https://github.com/az-digital/arizona-bootstrap/blob/main/LICENSE)
  */`
}

export default getBanner
