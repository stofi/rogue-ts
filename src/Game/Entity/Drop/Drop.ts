import type { IDrop, IItem } from '~/Models'

export default class Drop implements IDrop {
  constructor(
    public name: string,
    public x: number,
    public y: number,
    public item: IItem
  ) {
    if (name.length < 1) {
      throw new Error('name must be at least 1 character long')
    }
  }
}
