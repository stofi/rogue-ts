import { TileType } from '@/Game'

describe('testing Tile', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof TileType
    expect(result).toBe('function')
  })
})
