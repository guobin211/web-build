import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'

const current = dirname(fileURLToPath(import.meta.url))

export const ROOT_PATH = resolve(current, '..')

/**
 * 相对于project的路径
 * @param relativePath {string} /scripts/config.js
 * @return {string}
 */
export function getAbsolutePath(relativePath) {
  return join(ROOT_PATH, relativePath)
}

export default {
  ROOT_PATH,
  getAbsolutePath,
}
