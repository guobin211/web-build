import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const current = dirname(fileURLToPath(import.meta.url))

const getCurrentRoot = () => {
  return process.env.npm_lifecycle_event ? process.cwd() : resolve(current, '../../')
}

/**
 * @type {NodeRequire}
 */
const projectRequire = createRequire(getCurrentRoot())

/**
 * type="commonjs" 中代替 require
 * @param absolutePath {string}
 * @return {*}
 */
export function nodeRequire(absolutePath = '') {
  return projectRequire(absolutePath)
}
