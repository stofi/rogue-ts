import type IAction from '../IAction'

export default interface IItem {
  name: string
  drawAction?: IAction
  playAction?: IAction
  discardAction?: IAction
}
