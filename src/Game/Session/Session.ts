import type { ILevel, IPlayer } from '~/Models'

export default class Session {
  constructor(public root: ILevel, public player: IPlayer) {
    if (!root) {
      throw new Error('level must be provided')
    }
    this.root.entities.push(player)
  }

  public get activeLevel() {
    return this.root.getDeepestActiveChild()
  }

  /**
   * Make a turn in the game.
   */
  public async takeTurn() {
    const level = this.activeLevel
    if (!level) {
      throw new Error('No active level')
    }
    for (const entity of level.entities) {
      await entity.takeTurn(level)
    }
    // have any entities entered a child level?
    // loop over the list of entities backwards so that we can remove entities
    // from the list as we go
    for (let i = level.entities.length - 1; i >= 0; i--) {
      const entity = level.entities[i]
      // get its position
      const { x, y } = entity
      // get the child level at that position
      const childLevel = level.getChildAt(x, y)
      if (!childLevel) continue
      // remove the entity from the level
      level.entities.splice(i, 1)
      // change coordinates to the child level
      entity.x = x - childLevel.x
      entity.y = y - childLevel.y
      // add the entity to the child level
      childLevel.entities.push(entity)
      if (entity.isPlayer) {
        childLevel.active = true
      }
    }

    // have any entities exited into a parent level?
    for (let i = level.entities.length - 1; i >= 0; i--) {
      const entity = level.entities[i]
      // get its position
      const { x, y } = entity
      // get the parent level at that position
      const parentLevel = level.getParent()
      if (!parentLevel) continue
      // remove the entity from the level
      level.entities.splice(i, 1)
      // change coordinates to the parent level
      entity.x = x + parentLevel.x
      entity.y = y + parentLevel.y
      // add the entity to the parent level
      parentLevel.entities.push(entity)
      if (entity.isPlayer) {
        parentLevel.deactiveChild()
      }
    }
  }

  start() {
    throw new Error('Method not implemented.')
  }
  end() {
    throw new Error('Method not implemented.')
  }
}
