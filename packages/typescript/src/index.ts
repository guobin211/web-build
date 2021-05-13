import { Method } from './method'

class MoreTest {
  @Method()
  test() {
    console.log(this)
  }
}

const mt = new MoreTest()

mt.test()
const data = [1, 2, 4]
for (const el of data) {
  console.log(el)
}

for (const key in data) {
  console.log(data[key])
  data[1] = 3
}
