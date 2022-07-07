import type { IAction, IBreed, IItem, ILevel, IMonster } from '../../../Models'

export default class Breed implements IBreed {
  constructor(
    readonly name: string,
    readonly maxHealth: number,
    readonly items: IItem[],
    readonly loot: IItem[]
  ) {}
  takeTurn(monster: IMonster, level: ILevel): Promise<IAction> {
    throw new Error('Method not implemented.')
  }
  spawn(monster: IMonster): void {
    monster.health = this.maxHealth
  }
}
