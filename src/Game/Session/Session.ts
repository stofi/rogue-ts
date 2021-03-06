import type { ILevel, IPlayer, ISession } from '../../Models'

export default class Session implements ISession {
  constructor(
    public root: ILevel,
    public player: IPlayer,
    public logging = false
  ) {
    if (!root) {
      throw new Error('level must be provided')
    }
    this.root.entities.push(player)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(...args: any[]) {
    if (this.logging) {
      console.log(...args)
    }
  }

  public get activeLevel() {
    return this.root.getDeepestActiveChild() ?? this.root
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
      const action = await entity.takeTurn(level)
      const result = action.use(entity)
      this.log(
        `${entity.name} used ${action.name} ${
          result.success ? 'successfully' : 'unsuccessfully'
        }${result.reason ? `: ${result.reason}` : ''}`
      )
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
