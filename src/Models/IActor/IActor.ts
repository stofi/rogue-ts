import type IAction from '../IAction'

export default interface IActor {
  takeTurn(): IAction
}
