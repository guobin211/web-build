import { getRandomId } from './get_random'

describe('getRandomId', () => {
  expect(getRandomId().length).toEqual(16)
})
