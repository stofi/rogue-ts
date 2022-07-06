import type { IAction, IPlayer, ILevel } from '~/Models'

export default class Player implements IPlayer {
  isPlayer = true
  isAlive = true
  constructor(public name: string, public x: number, public y: number) {
    if (name.length < 1) {
      throw new Error('name must be at least 1 character long')
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async takeTurn(level: ILevel): Promise<IAction> {
    throw new Error('Method not implemented.')
  }
}
