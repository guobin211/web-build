export function mapArray(list) {
  if (Array.isArray(list)) {
    console.log(list.includes('1'))
    console.timeStamp('for-of')
    for (const listElement of list) {
      console.log(listElement)
    }
    console.timeEnd('for-of')
    console.timeStamp('for-each')
    list.forEach((el) => {
      console.log(el)
    })
    console.timeEnd('for-each')
  }
}
