import type { IAction, IBreed, IItem, ILevel, IMonster } from '../../../Models'

export default class Breed implements IBreed {
  constructor(
    public name: string,
    public maxHealth: number,
    public items: IItem[],
    public loot: IItem[]
  ) {}
  takeTurn(monster: IMonster, level: ILevel): Promise<IAction> {
    throw new Error('Method not implemented.')
  }
  spawn(monster: IMonster): void {
    monster.health = this.maxHealth
  }
}
