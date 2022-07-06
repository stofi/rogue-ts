import type IEntity from '..'
import type IActor from '../../IActor'
import type IBreed from './IBreed'

export default interface IMonster extends IEntity, IActor {
  health: number
  breed: IBreed
}
