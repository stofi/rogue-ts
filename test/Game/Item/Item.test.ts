import { Item } from '@/Game'
import type { IAction } from '@/Models'

const dummyAction: IAction = {
  use: () => {
    return {
      success: true,
      message: '',
      item: null,
    }
  },
}

describe('testing Item', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct without actions', () => {
    const item = new Item('item')
    expect(item).toBeInstanceOf(Item)
  })
  test('it should construct with actions', () => {
    const item = new Item('item', dummyAction, dummyAction, dummyAction)
    expect(item).toBeInstanceOf(Item)
  })
  test('it should have a name', () => {
    const item = new Item('item')
    expect(item.name).toBe('item')
  })
})
