import type { IBreed, IItem, IMonster } from '@/Models'

export default class Breed implements IBreed {
  constructor(
    public name: string,
    public maxHealth: number,
    public items: IItem[],
    public loot: IItem[]
  ) {}
  spawn(monster: IMonster): void {
    monster.health = this.maxHealth
  }
}
