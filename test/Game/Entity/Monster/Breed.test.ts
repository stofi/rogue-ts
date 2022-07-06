import { Breed } from '@/Game'

describe('testing Breed', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof Breed
    expect(result).toBe('function')
  })
})
