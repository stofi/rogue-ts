import type { IAction, IBreed, IMonster } from '~/Models'

export default class Monster implements IMonster {
  health = 0

  constructor(
    public name: string,
    public x: number,
    public y: number,
    public breed: IBreed
  ) {
    if (name.length < 1) {
      throw new Error('name must be at least 1 character long')
    }
  }

  takeTurn(): IAction {
    throw new Error('Method not implemented.')
  }
}
