import { Monster } from '@/Game'
import type { IBreed } from '@/Models'

const dummyBreed: IBreed = {
  name: 'dummy',
  maxHealth: 10,
  items: [],
  loot: [],
}

describe('testing Monster', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof Monster
    expect(result).toBe('function')
  })
  test('it should have a name', () => {
    const result = Monster.name
    expect(result).toBe('Monster')
  })
  test('it should construct with breed', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster).toBeInstanceOf(Monster)
  })
  test('it should have a name', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster.name).toBe('monster')
  })
  test('it should have a health', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster.health).toBe(0)
  })
  test('it should have a breed', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster.breed).toBe(dummyBreed)
  })
  test('it is not a player', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster.isPlayer).toBe(false)
  })
})
