import { Drop, Item } from '@/Game'

const dummyItem: Item = new Item('dummy')

describe('testing Drop', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct without actions', () => {
    const drop = new Drop('drop', 0, 0, dummyItem)
    expect(drop).toBeInstanceOf(Drop)
  })
})