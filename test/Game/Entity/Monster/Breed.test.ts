import { Breed, Monster } from '@/Game'

const getBreed = () => new Breed('name', 1, [], [])

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
    const result = getBreed()
    expect(result).toBeInstanceOf(Breed)
  })
  test('it should have a name', () => {
    const result = getBreed()
    expect(result.name).toBe('name')
  })
  test('it should have a maxHealth', () => {
    const result = getBreed()
    expect(result.maxHealth).toBe(1)
  })
  test('it should have items', () => {
    const result = getBreed()
    expect(result.items).toBeInstanceOf(Array)
  })
  test('it should have loot', () => {
    const result = getBreed()
    expect(result.loot).toBeInstanceOf(Array)
  })
  test('it should have a spawn function', () => {
    const result = getBreed()
    expect(result.spawn).toBeInstanceOf(Function)
  })

  test('it should set the monsters health after spawn', () => {
    const result = getBreed()
    const monster = new Monster('name', 0, 0, result)
    result.spawn(monster)
    expect(monster.health).toBe(1)
  })
})
