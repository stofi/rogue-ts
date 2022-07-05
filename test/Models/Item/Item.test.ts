import Item from '@/Models/Item'
import Action from '@/Models/Action'

const dummyAction: Action = {
  use: () => {
    return {
      success: true,
      message: '',
      item: null,
    }
  },
}

describe('testing Models/Item', () => {
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
})
