import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'

const current = dirname(fileURLToPath(import.meta.url))

export const ROOT_PATH = resolve(current, '..')

export const BUILD_PATH = join(ROOT_PATH, 'build')

export const PROD_PATH = join(ROOT_PATH, 'dist')

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
  BUILD_PATH,
  PROD_PATH,
  getAbsolutePath,
}
