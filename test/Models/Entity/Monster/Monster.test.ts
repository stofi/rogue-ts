import Monster from '@/Models/Entity/Monster'
import Breed from '@/Models/Entity/Monster/Breed'

const dummyBreed: Breed = {
  name: 'dummy',
  maxHealth: 10,
  items: [],
  loot: [],
}

describe('testing Models/Entity/Monster', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct without actions', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster).toBeInstanceOf(Monster)
  })
  test('it has a takeTurn method', () => {
    const monster = new Monster('monster', 0, 0, dummyBreed)
    expect(monster.takeTurn).toBeInstanceOf(Function)
  })
})
