import { Tile } from '@/Game'

describe('testing Tile', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof Tile
    expect(result).toBe('function')
  })
})
