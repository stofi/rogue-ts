import type { IAction, IBreed, IMonster, ILevel } from '../../../Models'

export default class Monster implements IMonster {
  isPlayer = false
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
  spawn(): void {
    this.breed.spawn(this)
  }

  async takeTurn(level: ILevel): Promise<IAction> {
    return this.breed.takeTurn(this, level)
  }
}
