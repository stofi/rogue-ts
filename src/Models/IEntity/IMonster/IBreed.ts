import type IItem from '../../IItem'
import type IMonster from './IMonster'
import type ILevel from '../../ILevel'
import type IAction from '../../IAction'

export default interface IBreed {
  name: string
  maxHealth: number
  items: IItem[]
  loot: IItem[]
  spawn(monster: IMonster): void
  takeTurn(monster: IMonster, level: ILevel): Promise<IAction>
}
