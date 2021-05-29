import { mapArray } from './array-test'

const arrowFunction = (list) => {
  mapArray(list)
  for (const listElement of list) {
    console.log(listElement)
  }
}

async function getConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3])
    }, 1000)
  })
}

getConfig()
  .then((data) => {
    return arrowFunction(data)
  })
  .catch((err) => {
    console.log(err)
  })
