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
  test('it should have a name', () => {
    const result = Breed.name
    expect(result).toBe('Breed')
  })
  test('it should construct', () => {
    const result = new Breed('name', 1, [], [])
    expect(result).toBeInstanceOf(Breed)
  })
  test('it should have a name', () => {
    const result = new Breed('name', 1, [], [])
    expect(result.name).toBe('name')
  })
  test('it should have a maxHealth', () => {
    const result = new Breed('name', 1, [], [])
    expect(result.maxHealth).toBe(1)
  })
  test('it should have items', () => {
    const result = new Breed('name', 1, [], [])
    expect(result.items).toBeInstanceOf(Array)
  })
  test('it should have loot', () => {
    const result = new Breed('name', 1, [], [])
    expect(result.loot).toBeInstanceOf(Array)
  })
})
