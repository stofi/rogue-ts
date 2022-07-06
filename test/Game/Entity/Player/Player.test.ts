import { Player } from '@/Game'

describe('testing Player', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct without actions', () => {
    const player = new Player('player', 0, 0)
    expect(player).toBeInstanceOf(Player)
  })
  test('it has a takeTurn method', () => {
    const player = new Player('player', 0, 0)
    expect(player.takeTurn).toBeInstanceOf(Function)
  })
  test('it has is a player', () => {
    const player = new Player('player', 0, 0)
    expect(player.isPlayer).toBe(true)
  })
  test('it has a name', () => {
    const player = new Player('player', 0, 0)
    expect(player.name).toBe('player')
  })
  test('it is alive', () => {
    const player = new Player('player', 0, 0)
    expect(player.isAlive).toBe(true)
  })
})
