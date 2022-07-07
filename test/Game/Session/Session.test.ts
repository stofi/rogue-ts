import { Session, Level } from '@/Game'
import type { IPlayer, IAction, ILevelType } from '@/Models'

const dummyLevelType: ILevelType = {
  name: 'dummy level type',
  breeds: [],
  tileTypes: [],
  maxMonsters: 0,
  generate: () => {
    //
  },
}
const dummyAction: IAction = {
  name: 'dummy action',
  use() {
    return {
      success: true,
    }
  },
}
const dummyLevel = new Level(10, 10, dummyLevelType)
const dummyPlayer: IPlayer = {
  isAlive: true,
  isPlayer: true,
  name: 'dummy player',
  x: 0,
  y: 0,
  takeTurn: async () => dummyAction,
}

describe('testing Session', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof Session
    expect(result).toBe('function')
  })
  test('it should construct', () => {
    const result = new Session(dummyLevel, dummyPlayer)
    expect(result).toBeInstanceOf(Session)
  })
  test('it should have a root level', () => {
    const result = new Session(dummyLevel, dummyPlayer)
    expect(result.root).toBe(dummyLevel)
  })
  test('it should have a player', () => {
    const result = new Session(dummyLevel, dummyPlayer)
    expect(result.player).toBe(dummyPlayer)
  })
  test('it should have an active level', () => {
    const result = new Session(dummyLevel, dummyPlayer)
    expect(result.activeLevel).toBe(dummyLevel)
  })
  test('it should take turn without throwing', async () => {
    const result = new Session(dummyLevel, dummyPlayer)
    const turnPromise = result.takeTurn()
    await expect(turnPromise).resolves.toBeUndefined()
  })
})
