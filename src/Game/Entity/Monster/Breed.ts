import type { IBreed, IItem } from '~/Models'

export default class Breed implements IBreed {
  constructor(
    public name: string,
    public maxHealth: number,
    public items: IItem[],
    public loot: IItem[]
  ) {}
}
