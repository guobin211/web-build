const ABC_CODE: string[] = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')

export function getRandomId(length = 16): string {
  return new Array(length)
    .fill(0)
    .reduce((p) => p + ABC_CODE[parseInt((Math.random() * 36).toString())], '')
}
