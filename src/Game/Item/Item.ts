import type { IAction, IItem } from '~/Models'

// TODO: Implement Typed Object?

export default class Item implements IItem {
  drawAction?: IAction | undefined
  playAction?: IAction | undefined
  discardAction?: IAction | undefined

  constructor(
    public name: string,
    drawAction?: IAction,
    playAction?: IAction,
    discardAction?: IAction
  ) {
    if (name.length < 1) {
      throw new Error('name must be at least 1 character long')
    }
    this.drawAction = drawAction
    this.playAction = playAction
    this.discardAction = discardAction
  }
}
