import type IAction from '../IAction'

export default interface IEntity {
  takeTurn(): IAction
  name: string
  x: number
  y: number
}
