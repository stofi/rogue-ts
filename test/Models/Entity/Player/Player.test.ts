import Player from '~/Models/IEntity/IPlayer'

describe('testing Models/Entity/Player', () => {
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
})
