import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// eslint-disable-next-line import/no-unresolved
import { optimize } from 'svgo'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '../scss/img')
const destDir = path.join(__dirname, '../dist/css/img')

async function minifySvg(entry) {
  if (entry.isFile() && entry.name.endsWith('.svg')) {
    const filePath = path.join(srcDir, entry.name)
    const svgContent = await fs.readFile(filePath, 'utf8')
    const result = optimize(svgContent, { path: filePath })
    const destPath = path.join(destDir, entry.name)
    await fs.writeFile(destPath, result.data, 'utf8')
    console.log(`Minified: ${entry.name}`)
  }
}

(async () => {
  try {
    await fs.rm(destDir, { recursive: true, force: true })
    await fs.mkdir(destDir, { mode: 0o775 })
  } catch (error) {
    throw new Error(`Error preparing destination directory: ${error}`)
  }

  try {
    const entries = await fs.readdir(srcDir, { withFileTypes: true })
    await Promise.all(entries.map(minifySvg))
    console.log('SVG minification complete.')
  } catch (error) {
    throw new Error(`Error during SVG minification: ${error}`)
  }
})()
