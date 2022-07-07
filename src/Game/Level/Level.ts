import type {
  ILevel,
  ITileContent,
  ITile,
  IEntity,
  ILevelType,
  ILevelBreedDictionary,
  ILevelTileTypeDictionary,
} from '../../Models'

export default class Level implements ILevel {
  width: number
  height: number
  active = false
  x = 0
  y = 0
  children: ILevel[] = []
  entities: IEntity[] = []
  parent = undefined as ILevel | undefined
  tiles: Array<ITile | undefined>
  monsterCount = 0
  constructor(width: number, height: number, public type: ILevelType) {
    if (width < 1) {
      throw new Error('width must be greater than 0')
    }
    if (height < 1) {
      throw new Error('height must be greater than 0')
    }
    this.width = width
    this.height = height
    this.tiles = new Array(width * height)
  }
  tileDictionary: ILevelTileTypeDictionary = []
  breedDictionary: ILevelBreedDictionary = []

  static boundsError = new Error('coordinates are out of bounds')

  public boundsGuard(x: number, y: number, offset = 0): boolean {
    return (
      x < offset ||
      x >= this.width - offset ||
      y < offset ||
      y >= this.height - offset
    )
  }
  public generate(): void {
    this.type.generate(this)
  }

  public placeEntity(
    x: number,
    y: number,
    entity: IEntity,
    deep = false
  ): void {
    if (this.boundsGuard(x, y)) {
      throw Level.boundsError
    }
    // is target in a child level?
    const child = this.getChildAt(x, y)
    if (child) {
      if (deep) {
        child.placeEntity(x - child.x, y - child.y, entity, deep)
      } else {
        throw new Error(
          'cannot place entity in a child level without `deep = true`'
        )
      }
    } else {
      this.entities.push(entity)
    }
  }
  public removeEntity(entity: IEntity): void {
    const index = this.entities.indexOf(entity)
    if (index === -1) {
      throw new Error('entity is not in this level')
    }
    this.entities.splice(index, 1)
  }
  public translateForChild(
    x: number,
    y: number,
    child: ILevel
  ): { x: number; y: number } {
    if (child.parent !== this) {
      throw new Error('child is not a child of this level')
    }
    return {
      x: x - child.x,
      y: y - child.y,
    }
  }
  public translateForParent(x: number, y: number): { x: number; y: number } {
    if (!this.parent) {
      return { x, y }
    }
    return {
      x: x + this.x,
      y: y + this.y,
    }
  }

  public get activeChild(): ILevel | undefined {
    for (const child of this.children) {
      if (child.active) {
        return child
      }
    }
    return undefined
  }
  public set activeChild(child: ILevel | undefined) {
    for (const c of this.children) {
      c.active = c === child
    }
  }

  public deactiveChild(): void {
    for (const child of this.children) {
      if (child.active) {
        child.active = false
      }
    }
  }

  public getParent(): ILevel | undefined {
    return this.parent
  }

  /**
   * Return an array of all active child levels, in order of their appearance in the
   * tree.
   * @returns An array of all the active child levels.
   */
  public getActiveChildStack(): ILevel[] {
    const stack: ILevel[] = []
    for (const child of this.children) {
      if (child.active) {
        stack.push(child)
        stack.push(...child.getActiveChildStack())
      }
    }
    return stack
  }

  public getDeepestActiveChild(): ILevel | undefined {
    const stack = this.getActiveChildStack()
    return stack.length ? stack[stack.length - 1] : this
  }

  public getTile(x: number, y: number, deep = false): ITile | undefined {
    if (this.boundsGuard(x, y)) {
      throw Level.boundsError
    }
    // is target in a child level?
    const child = this.getChildAt(x, y)
    if (child) {
      if (deep) {
        return child.getTile(x - child.x, y - child.y, deep)
      }
    } else {
      return this.tiles[y * this.width + x]
    }
  }

  public setTile(x: number, y: number, tile: ITile, deep = false): void {
    // throw if out of bounds
    if (this.boundsGuard(x, y)) {
      throw Level.boundsError
    }
    // is target in a child level?
    const child = this.getChildAt(x, y)
    if (child) {
      if (deep) {
        child.setTile(x - child.x, y - child.y, tile, deep)
      } else {
        throw new Error(
          'cannot place tile in a child level without `deep = true`'
        )
      }
    } else {
      this.tiles[y * this.width + x] = tile
    }
  }

  public getChildAt(x: number, y: number): ILevel | undefined {
    for (const child of this.children) {
      if (
        x >= child.x &&
        x < child.x + child.width &&
        y >= child.y &&
        y < child.y + child.height
      ) {
        return child
      }
    }
    return undefined
  }

  public addChild(x: number, y: number, level: ILevel): void {
    // TODO: Make sure children cant be placed at the edges of the level. That way we dont have to think about transiting entities accross multiple levels, assuming we also disallow moves greater than one tile.

    const width = level.width
    const height = level.height
    // x must be > 0 and x + width must be < this.width
    if (x < 1 || x + width > this.width - 1) {
      throw new Error('x must be between 1 and width - 1')
    }
    // y must be > 0 and y + height must be < this.height
    if (y < 1 || y + height > this.height - 1) {
      throw new Error('y must be between 1 and height - 1')
    }
    const otherChildLevelAtTile = this.getChildAt(x, y)
    if (otherChildLevelAtTile) {
      throw new Error('cannot add child at tile that already has a child')
    }
    level.parent = this
    level.x = x
    level.y = y
    this.children.push(level)
  }

  public getTileContent(x: number, y: number): ITileContent | undefined {
    const child = this.getChildAt(x, y)
    if (child) {
      return child.getTileContent(x - child.x, y - child.y)
    }
    // entities
    const tile = this.getTile(x, y)

    const entities: IEntity[] = this.entities.filter(
      (entity) => entity.x === x && entity.y === y
    )
    return {
      tile,
      entities,
      x,
      y,
    }
  }
}
