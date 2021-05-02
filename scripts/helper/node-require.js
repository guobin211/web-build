import { createRequire } from 'module'
import { resolve, join } from 'path'
import { readdirSync, statSync } from 'fs'

const [, current] = resolve(import.meta.url).split('file:')
const root = resolve(current, '../../')
/**
 * @type {NodeRequire}
 */
const projectRequire = createRequire(root)
const dirs = readdirSync(root).filter((file) => statSync(file).isDirectory())

/**
 * @param absolutePath {string}
 * @return {*}
 */
export function nodeRequire(absolutePath = '') {
  if (absolutePath.startsWith(process.env.HOME)) {
    return projectRequire(absolutePath)
  }
  let file = absolutePath
  for (const dir of dirs) {
    if (file.startsWith(dir)) {
      return projectRequire(join(root, file))
    }
  }
  file = resolve(root, absolutePath)
  return projectRequire(file)
}
