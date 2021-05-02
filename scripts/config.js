import { dirname, resolve, join } from 'path'

const [, current] = resolve(import.meta.url).split('file:')

export const ROOT_PATH = resolve(dirname(current), '..')

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
