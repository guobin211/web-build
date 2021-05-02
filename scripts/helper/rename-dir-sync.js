import { readdirSync, renameSync } from 'fs'
import { join } from 'path'

/**
 * @param workDir {string}
 * @param before {string}
 * @param after {string}
 * @return {void}
 */
export function renameDirSync(workDir, before, after) {
  const files = new Set(readdirSync(workDir))
  for (const file of files) {
    if (file === before) {
      renameSync(join(workDir, file), join(workDir, after))
    }
  }
}
