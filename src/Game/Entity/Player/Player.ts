import type { IAction, IPlayer } from '~/Models'

export default class Player implements IPlayer {
  constructor(public name: string, public x: number, public y: number) {
    if (name.length < 1) {
      throw new Error('name must be at least 1 character long')
    }
  }
  takeTurn(): IAction {
    throw new Error('Method not implemented.')
  }
}
