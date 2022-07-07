import { Monster } from '@/Game'
import type { IBreed } from '@/Models'

const dummyBreed: IBreed = {
  name: 'dummy',
  maxHealth: 10,
  items: [],
  loot: [],
  spawn: () => {
    throw new Error('Method not implemented.')
  },
}

const getMonster = () => new Monster('dummy monster', 0, 0, dummyBreed)

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
    const monster = getMonster()
    expect(monster).toBeInstanceOf(Monster)
  })
  test('it should have a name', () => {
    const monster = getMonster()
    expect(monster.name).toBe('dummy monster')
  })
  test('it should have a health', () => {
    const monster = getMonster()
    expect(monster.health).toBe(0)
  })
  test('it should have a breed', () => {
    const monster = getMonster()
    expect(monster.breed).toBe(dummyBreed)
  })
  test('it is not a player', () => {
    const monster = getMonster()
    expect(monster.isPlayer).toBe(false)
  })
})
