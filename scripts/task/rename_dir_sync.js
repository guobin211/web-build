import { readdirSync, renameSync } from 'fs'
import { join } from 'path'

/**
 * @param work_dir {string}
 * @param before {string}
 * @param after {string}
 * @return {void}
 */
export function rename_dir_sync(work_dir, before, after) {
  const files = new Set(readdirSync(work_dir));
  for (const file of files) {
    if (file === before) {
      renameSync(join(work_dir, file), join(work_dir, after))
    }
  }
}
