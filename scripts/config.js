import { resolve, dirname } from 'path'

const [, current] = resolve(import.meta.url).split('file:')

export const ROOT_PATH = resolve(dirname(current), '..')

export default {
  ROOT_PATH,
}
