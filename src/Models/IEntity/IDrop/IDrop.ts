import type IEntity from '..'
import type IItem from '../../IItem'

export default interface IDrop extends IEntity {
  item: IItem
}
