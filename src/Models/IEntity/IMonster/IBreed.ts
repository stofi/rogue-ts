import type IItem from '../../IItem'
import type IMonster from './IMonster'

export default interface IBreed {
  name: string
  maxHealth: number
  items: IItem[]
  loot: IItem[]
  spawn(monster: IMonster): void
}
