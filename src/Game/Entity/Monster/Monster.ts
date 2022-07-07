import type { IAction, IBreed, IMonster, ILevel } from '@/Models'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async takeTurn(level: ILevel): Promise<IAction> {
    throw new Error('Method not implemented.')
  }
}
