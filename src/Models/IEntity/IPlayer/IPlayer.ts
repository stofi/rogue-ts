import type IEntity from '..'

export default interface IPlayer extends IEntity {
  // This is here jsut to stop ts from shouting
  isAlive: boolean
}
